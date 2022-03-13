import React,{ useState,useEffect, useRef } from 'react';
import './Dashboard.css';
import Header from '../../components/Header/Header';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NotesForm from '../../components/NotesForm/NotesForm';
import NoteSelected from '../../components/NoteSelected/NoteSelected';
import { useSelector } from 'react-redux';
import { database } from '../../firebase';
import { useAuth } from '../../useContext';
import { v4 as uuidv4 } from 'uuid';
import Folder from '../../components/Folder/Folder';
import { selectNote } from '../../redux/slices/appSlice';
import { useDispatch } from 'react-redux';
import { notesOrder } from '../../utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditNoteForm from '../../components/EditNoteForm/EditNoteForm';
import DeleteIcon from '@mui/icons-material/Delete';


function Dashboard() {
    
    const[editModeOn,setEditModeOn] = useState(false);
    const[editCurrentNote,setEditCurrentNote] = useState(false);
    const currentlySelectedFolder = useSelector((state) => state.ElementReducer.selectedFolderId);
    const currentlySelectedNote = useSelector((state) => state.ElementReducer.selectedNoteId);
    const [allFolders,setAllFolders] = useState([]); 
    const [notesToDisplay,setNotesToDisplay] = useState([]);

    const allNotesRef = useRef([]);
    const orderOfNotesRef = useRef([]);
    const tempOrderOfNotesRef = useRef([]);

    const { currentUser } = useAuth();
    const dispatch = useDispatch();



    //drag drop sort of notes in the UI is handled from this function
    const handleDragSortNotes = async(res) =>{

        //checks whether there is a new order update the UI
        //Also the order to the database to currently selected folder collection


        if (!res.destination) return;

        const reorderedItems = await reorder(
            notesToDisplay,
            res.source.index,
            res.destination.index
        );

        setNotesToDisplay(reorderedItems)

        try{
            await database.user.doc(currentUser.uid).collection('folders')
            .doc(currentlySelectedFolder?.selectedFolderId).update({
                orderOfNotes: orderOfNotesRef.current
            })
        }catch{
            console.log('error writing order to the database')
        }

    }

    const reorder = async(list, startIndex, endIndex) => {

        //Return the reordered array which has to be updated to the UI
        //set the new order which has to be written to the database....

        let newOrder = [];
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        result.map((n)=>(
            newOrder = [...newOrder,n.id]
        ))
        orderOfNotesRef.current = newOrder

        return result;
    };


    //pull all the folders in the user account
    useEffect(() => {
        const getAllFolders = async() =>{
            try{
                await database.user.doc(currentUser.uid).collection('folders')
                .onSnapshot((snapshot) => {

                    //set all the folders in the variable and map through it to display.... 
                    setAllFolders(snapshot.docs.map((doc)=>(
                        doc.data()
                    )))
                });
            }
            catch(err){
                console.log(err)
            }           
        }
        getAllFolders();
    }, [])


    useEffect(() => {
        const getAllNotes = async() =>{

                //Pull all the notes in the selected folder 
                //Maintain the order which is stored and updated through drag and drop

                const b = await database.user.doc(currentUser.uid).collection('folders')
                .doc(currentlySelectedFolder?.selectedFolderId)

                await b.get().then((doc) => {
                if (doc.exists) {
                    tempOrderOfNotesRef.current = doc.data().orderOfNotes || []

                } else {
                    console.log("No such document!");
                }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                })

                //If order doen not exists , ie collection neither drag drop sorted or no notes in the folder
                //just set the notesToDisplay as it is , Otherwise
                //use a function to sort the result in the particular order 
                //and then set the state >>>

            try{
                await database.user.doc(currentUser.uid).collection('notes')
                .onSnapshot(async(snapshot) => {
                    allNotesRef.current = await snapshot.docs.map((doc)=>(
                        doc.data()
                    )).filter((note)=>(
                        note.parentFolderId == currentlySelectedFolder?.selectedFolderId
                    ))

                    if((tempOrderOfNotesRef.current).length == 0){
                        setNotesToDisplay(allNotesRef.current)
                    }
                    else{
                        setNotesToDisplay(notesOrder(allNotesRef.current,tempOrderOfNotesRef.current,'id'))
                    }
                });
            }
            catch(err){
                console.log(err)
            }        
        }
        getAllNotes();

    }, [currentlySelectedFolder?.selectedFolderId])


    //creates a new folder in the selected folder 
    //if any otherwise in the root
    
    const createNewFolder = async(e) =>{
        e.preventDefault();
        const folderDocumentId = uuidv4();

        const folder = window.prompt("please enter the folder name")
        if(folder === ''){
            window.alert('folder name cannot be empty');
            return;
        }
        
        try{
            await database.user.doc(currentUser.uid).collection('folders').doc(folderDocumentId).set({
                id: folderDocumentId,
                folderName: folder,
                parentFolderId: currentlySelectedFolder,
                OrderOfNotes: []
            })
            
        }catch(error){
            console.log(error);
        }
    }

    //create a new note inside the folder selected
    //if no folder selected notify that ....

    const createNewNote = async(e) =>{
        e.preventDefault();
        //if no folder selected dont allow to create a note
        if(currentlySelectedFolder.selectedFolderId === null){
            window.alert("Please select a folder");
            return;
        }

        //if the note is selected should deselect it 
        //then set the state to show the notes creation form....
        dispatch(selectNote({
            selectedNoteId: null,
        }))
        setEditModeOn(true);
    }

    const handleClickOnNote = async(id) =>{

    /*
    handles functions on click on notes
    such as setting the selected note and displaying selected note 
    in the notes pane
    */ 
        const noteDoc = await database.user.doc(currentUser.uid).collection('notes')
        .doc(id)

        await noteDoc.get().then((doc) => {
        if (doc.exists) {
            dispatch(selectNote({
                selectedNoteId : doc.data(),
            }))

        } else {
            console.log("No such document!");
        }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })  
        console.log(currentlySelectedNote)

    }

    //function to handle delete operation of the note
    const deleteNote = async(id) =>{
        const del = window.confirm("Sure to delete this entry ?");

        if(!del) return;

        try{
            await database.user.doc(currentUser.uid).collection('notes')
            .doc(id).delete()

            if(currentlySelectedNote.selectedNoteId.id == id){
                dispatch(selectNote({
                    selectedNoteId : null
                }))
            }
        }
        catch(err){
            console.log(err)
        }

    }  
    
    return (
        <div className="dashboard">
            <Header/>
            <div className="dashboard__body">
                <div className="dashboard__foldersPane">
                        <div className="dashboard__createFolder">
                            <CreateNewFolderIcon fontSize={'large'} onClick={createNewFolder}/>
                        </div>

                        {allFolders?.map((folder)=>(
                            <div className={`${(currentlySelectedFolder?.selectedFolderId == folder.id) ? "setActive":""}`} draggable="true">
                                <Folder 
                                id={folder?.id}
                                key={folder?.id}
                                name={folder?.folderName}
                                /> 
                            </div>
                        ))}

                </div>
                <DragDropContext onDragEnd={handleDragSortNotes}>
                <div className="dashboard__notesPane">
                    <div className="dashboard__createNotes">
                        <NoteAddIcon fontSize={'large'} onClick={createNewNote}/>
                    </div>
                    <Droppable droppableId="dashboard__notesSort">
                        {(provided)=>(
                            <div className="dashboard__notesSort" {...provided.droppableProps} ref={provided.innerRef}>   
                                
                                {notesToDisplay.map((note,index)=>(
                                    <Draggable key={note.id} draggableId={note.id} index={index}>
                                        {(provided)=>(
                                            <div className={`dashboard__note ${(currentlySelectedNote?.selectedNoteId?.id == note.id) ? "selected":""}`} id={note.id}
                                            draggable="true" 
                                            onClick={()=>handleClickOnNote(note.id)}
                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <h4>{note.noteHeading}</h4>
                                                <span className="notes__tags">
                                                    {(note?.tags)?.map((tag)=>(
                                                        <p># {tag}</p>
                                                    ))}
                                                </span>
                                                <p>{note.noteBody}</p>
                                                <DeleteIcon 
                                                className="dashboard__noteDelete" 
                                                onClick={()=>deleteNote(note.id)}/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))} 
                            </div>
                        )}
                    </Droppable>           
                </div>
                </DragDropContext>
                <div className="dashboard__selectedNotePane">
                    {(currentlySelectedNote?.selectedNoteId == null) ? (
                        <NotesForm cancelEdit={()=>setEditModeOn(false)}/>
                    ):(
                        <>
                        {!editCurrentNote ? (
                            <NoteSelected onEdit={()=>setEditCurrentNote(true)}/>
                        ):(
                            <EditNoteForm cancelEdit={()=>setEditCurrentNote(false)}/>
                        )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
