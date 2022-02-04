import React,{ useState,useEffect } from 'react';
import './Dashboard.css';
import Header from '../../components/Header/Header'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NotesForm from '../../components/NotesForm/NotesForm';
import NoteSelected from '../../components/NoteSelected/NoteSelected';
import { useSelector } from 'react-redux';
import { database } from '../../firebase';
import { useAuth } from '../../useContext';
import { v4 as uuidv4 } from 'uuid';
import Folder from '../../components/Folder/Folder';


function Dashboard() {
    const[editModeOn,setEditModeOn] = useState(false);
    const currentlySelectedFolder = useSelector((state) => state.ElementReducer.selectedFolderId);
    const currentlySelectedNote = useSelector((state) => state.ElementReducer.selectedNoteId);
    const [allFolders,setAllFolders] = useState([]); 

    const { currentUser } = useAuth();

    

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
            database.user.doc(currentUser.uid).collection('folders').doc(folderDocumentId).set({
                id: folderDocumentId,
                folderName: folder,
                parentFolderId: currentlySelectedFolder,
            })
            
        }catch(error){
            console.log(error);
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
                            <div className={`${(currentlySelectedFolder?.selectedFolderId == folder.id) ? "setActive":""}`}>
                                <Folder 
                                id={folder?.id}
                                key={folder?.id}
                                name={folder?.folderName}
                                /> 
                            </div>
                        ))}

                </div>
                <div className="dashboard__notesPane">
                    <div className="dashboard__createNotes">
                        <NoteAddIcon fontSize={'large'}/>
                    </div>            
                    <div className="dashboard__note">
                        <h4>Notes Header</h4>
                        <p>Notes body truncated</p>
                    </div>
                </div>
                <div className="dashboard__selectedNotePane">
                    {editModeOn ? (
                        <NotesForm cancelEdit={()=>setEditModeOn(false)}/>
                    ):(
                        <NoteSelected onEdit={()=>setEditModeOn(true)}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
