import React,{ useState } from 'react';
import './EditNoteForm.css';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from 'react-redux';
import { database } from '../../firebase';
import { useAuth } from '../../useContext';
import { selectNote } from '../../redux/slices/appSlice';
import { useDispatch } from 'react-redux';

function EditNoteForm({cancelEdit}) {

    const currentlySelectedNote = useSelector((state) => state.ElementReducer.selectedNoteId);
    const [updatedHeading,setUpdatedHeading] = useState('');
    const [updatedBody,setUpdatedBody] = useState('');
    const { currentUser } = useAuth();
    const dispatch = useDispatch();

    const handleEditNote = async(e) =>{
        e.preventDefault();
        try{

            await database.user.doc(currentUser.uid).collection('notes').doc(currentlySelectedNote?.selectedNoteId?.id).update({
                noteHeading: updatedHeading || currentlySelectedNote?.selectedNoteId?.noteHeading,
                noteBody: updatedBody || currentlySelectedNote?.selectedNoteId?.noteBody,
            })

            setUpdatedBody('');
            setUpdatedHeading('');

            //dispatch redux so that the note updated
            //otherwise it wont update by itself on render
            const newNoteDoc = await database.user.doc(currentUser.uid).collection('notes')
            .doc(currentlySelectedNote?.selectedNoteId?.id)

            await newNoteDoc.get().then((doc) => {
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

        }catch(err){
            console.log(err);
        }
        cancelEdit();
    }

    return (
            <form className="editNoteForm" id="editNoteForm" onSubmit={handleEditNote}>

                    <CancelIcon className="editNoteForm__cancelIcon" onClick={cancelEdit}/>
                    <h1>Edit Note</h1>
                    <h2>Heading</h2>
                    <div className="editNoteForm__notesHeader">
                        <input type="text" 
                        defaultValue={currentlySelectedNote?.selectedNoteId?.noteHeading}
                        onChange={(e)=>setUpdatedHeading(e.target.value)}/>
                    </div>
                    <div className="editNoteForm__notesTags">
                        <p>Tags:</p>
                    </div>
                    <h2>Content</h2>
                    <div className="editNoteForm__notesContent">
                        <textarea 
                        defaultValue={currentlySelectedNote?.selectedNoteId?.noteBody}
                        onChange={(e)=>setUpdatedBody(e.target.value)}/>
                    </div>
                    <button type="submit">Update</button>

            </form>   
    )
}

export default EditNoteForm