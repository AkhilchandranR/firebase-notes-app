import React from 'react';
import './NoteSelected.css';
import EditIcon from '@mui/icons-material/Edit';

function NoteSelected({ onEdit }) {
    return (
        <div className="noteSelected">
            <EditIcon className="noteSelected__editIcon" onClick={onEdit}/>
            <div className="noteSelected__notesHeader">
                    <h2>Header for note</h2>
                </div>
                <p>Created By: email placeholder</p>
                <div className="noteSelected__notesTags">
                    <p>Tags:</p>
                </div>
                <div className="noteSelected__notesContent">
                    <p>Notes body</p>
                </div>
        </div>
    )
}

export default NoteSelected
