import React from 'react'
import './Dashboard.css';
import Header from '../../components/Header/Header'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FolderIcon from '@mui/icons-material/Folder';

function Dashboard() {
    return (
        <div className="dashboard">
            <Header/>
            <div className="dashboard__body">
                <div className="dashboard__foldersPane">
                        <div className="dashboard__createFolder">
                            <CreateNewFolderIcon fontSize={'large'}/>
                        </div>            
                        <div className="dashboard__folder">
                            <FolderIcon/>
                            <p>Folder Name</p>
                        </div>
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
                <div className="dashboard__selectedNotePane"></div>
            </div>
        </div>
    )
}

export default Dashboard
