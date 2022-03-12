import React from 'react';
import './NoteSelected.css';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { useAuth } from "../../useContext";

function NoteSelected({ onEdit }) {

    const currentlySelectedNote = useSelector((state) => state.ElementReducer.selectedNoteId);
    const { currentUser } = useAuth();

    return (
        <div className="noteSelected">
            <EditIcon className="noteSelected__editIcon" onClick={onEdit}/>
            <div className="noteSelected__notesHeader">
                    <h2>{currentlySelectedNote?.selectedNoteId?.noteHeading}</h2>
                </div>
                <p>Created By: {currentUser?.email}</p>
                <div className="noteSelected__notesTags">
                    <p>Tags:</p>
                </div>
                <div className="noteSelected__notesContent">
                    <p>{currentlySelectedNote?.selectedNoteId?.noteBody}</p>
                </div>
        </div>
    )
}

export default NoteSelected
