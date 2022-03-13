import React,{ useState } from 'react';
import './NotesForm.css';
import CancelIcon from '@mui/icons-material/Cancel';

//from here there are changes.....
import { useAuth } from '../../useContext';
import { useSelector } from 'react-redux';
import { database } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

function NotesForm() {

    //connect all the variables to the fields and add a note to the firebase firestore.....
    const [noteHeader,setNoteHeader] = useState('');
    const [noteContent,setNoteContent] = useState('');
    const [noteTags,setNoteTags] = useState([]);


    const currentlySelectedFolder = useSelector((state) => state.ElementReducer.selectedFolderId);

    const { currentUser } = useAuth();

    //Function to add tags to the noteTags array
    const addTags = (e) =>{
        if (e.key === "Enter" && e.target.value !== "") {
            setNoteTags([...noteTags, e.target.value]);
            e.target.value = "";
        }
    }

    //Function to delete the selected tag......
    const deleteTags = (index) =>{
        setNoteTags([...noteTags.filter(tag => noteTags.indexOf(tag) !== index)]);
    }

    //create a note in the folder..{
    const createNote = async(e) =>{
        if(e.key === "Enter") return;
        
        //Create note....
        e.preventDefault();
        const noteDocumentId = uuidv4();
        if(currentlySelectedFolder == null){
            window.alert('Please select a folder')
            return;
        }

        if(noteHeader == '' || noteContent == ''){
            window.alert('Please add Heading and content')
            return;
        }
        
        try{
            await database.user.doc(currentUser.uid).collection('notes').doc(noteDocumentId).set({
                id: noteDocumentId,
                noteHeading: noteHeader,
                noteBody: noteContent,
                parentFolderId: currentlySelectedFolder.selectedFolderId,
                tags: noteTags
            })

            setNoteHeader('')
            setNoteContent('')
            setNoteTags([]);
        }
        catch(error){
            console.log(error)
        }

    }

    const cancelNoteCreation = (e) =>{
        e.preventDefault();
        setNoteContent('');
        setNoteHeader('');
        setNoteTags([]);
    }


    return (
            <div className="notesForm__notesForm" id="notesForm__notesForm">
                <CancelIcon className="notesForm__cancelIcon" onClick={cancelNoteCreation}/>
                <h1>Add new note</h1>
                <h2>Heading</h2>
                <div className="notesForm__notesHeader">
                    <input type="text" value={noteHeader} onChange={(e)=>setNoteHeader(e.target.value)}/>
                </div>
                
                <div className="notesForm__notesTags">
                    <p>Tags:</p>
                    <div className="notesForm__tagInput">
                        <ul>
                            {noteTags.map((tag, index) => (
                                <li key={index}>
                                    <span>{tag}</span>
                                    <CancelIcon fontSize={"small"} onClick={()=>deleteTags(index)}/>
                                </li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            placeholder="Press enter to add tags"
                            onKeyUp={(e)=>addTags(e)}
                        />
                    </div>
                </div>
                <h2>Content</h2>
                <div className="notesForm__notesContent">
                    <textarea value={noteContent} onChange={(e)=>setNoteContent(e.target.value)}/>
                </div>
                <button onClick={createNote}>ADD NOTE</button>
            </div>        
    )
}

export default NotesForm
