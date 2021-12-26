import React from 'react';
import Header from '../../components/Header/Header';
import './Profile.css';
import { useAuth } from "../../useContext";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const history = useHistory();
    const { currentUser,logout } = useAuth();

    async function handleLogout() {
    
        try {
          await logout()
          history.push("/login")
        } catch {
            toast.error("Failed to logout", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });    
        }
      }

      
    return (
        <div className="profile">
            <Header/>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="profile__body">
                <div className="profile__card">
                    <h2>Profile</h2>
                    <p><span>Email:</span> {currentUser.email}</p>
                    <button onClick={()=>{history.push('/update-profile')}}>Update Profile</button>
                    <button className="logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
