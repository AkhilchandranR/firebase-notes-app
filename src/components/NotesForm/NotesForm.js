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

    const currentlySelectedFolder = useSelector((state) => state.ElementReducer.selectedFolderId);

    const { currentUser } = useAuth();

    //create a note in the folder..{
    const createNote = async(e) =>{
        
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
            })

            setNoteHeader('')
            setNoteContent('')
            document.getElementById('notesForm__notesForm').reset();
        }
        catch(error){
            console.log(error)
        }

    }

    const cancelNoteCreation = (e) =>{
        e.preventDefault();
        document.getElementById('notesForm__notesForm').reset();
        setNoteContent('');
        setNoteHeader('');
    }


    return (
            <form className="notesForm__notesForm" id="notesForm__notesForm" onSubmit={createNote}>
                <CancelIcon className="notesForm__cancelIcon" onClick={cancelNoteCreation}/>
                <h1>Add new note</h1>
                <h2>Heading</h2>
                <div className="notesForm__notesHeader">
                    <input type="text" onChange={(e)=>setNoteHeader(e.target.value)}/>
                </div>
                
                <div className="notesForm__notesTags">
                    <p>Tags:</p>
                </div>
                <h2>Content</h2>
                <div className="notesForm__notesContent">
                    <textarea onChange={(e)=>setNoteContent(e.target.value)}/>
                </div>
                <button type="submit">ADD NOTE</button>
            </form>        
    )
}

export default NotesForm
