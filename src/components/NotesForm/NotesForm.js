import React from 'react';
import './NotesForm.css';
import CancelIcon from '@mui/icons-material/Cancel';

function NotesForm({ cancelEdit }) {
    return (
            <form className="notesForm__notesForm">
                <CancelIcon className="notesForm__cancelIcon" onClick={cancelEdit}/>
                <h1>Add new note</h1>
                <h2>Heading</h2>
                <div className="notesForm__notesHeader">
                    <input type="text"/>
                </div>
                <p>Created By: email placeholder</p>
                
                <div className="notesForm__notesTags">
                    <p>Tags:</p>
                </div>
                <h2>Content</h2>
                <div className="notesForm__notesContent">
                    <textarea/>
                </div>
                <button type="submit">ADD NOTE</button>
            </form>        
    )
}

export default NotesForm
