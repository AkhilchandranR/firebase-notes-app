import React from 'react';
import Header from '../../components/Header/Header';
import './Profile.css';

function Profile() {
    return (
        <div className="profile">
            <Header/>
            <div className="profile__body">
                <div className="profile__card">
                    <h2>Profile</h2>
                    <p><span>Email:</span> exaple@gmail.com</p>
                    <button>Update Profile</button>
                    <button className="logout">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
