import React,{ useState } from 'react';
import './Folder.css';
import FolderIcon from '@mui/icons-material/Folder';
import { selectFolder } from '../../redux/slices/appSlice';
import { useDispatch } from 'react-redux';

function Folder({id,name}) {
    const dispatch = useDispatch();

    //set the id to selectfolder and set active class..
    const setSelectedFolder = (e) =>{
        e.preventDefault();
        dispatch(selectFolder({
            selectedFolderId : id,
        }))
    }

    return (
        <div className="dashboard__folder" onClick={setSelectedFolder}>
            <FolderIcon/>
            <p>{name}</p>
        </div>
    )
}

export default Folder
