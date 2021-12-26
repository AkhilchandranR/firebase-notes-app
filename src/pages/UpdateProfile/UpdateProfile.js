import React from 'react';
import './UpdateProfile.css';
import { Link,useHistory } from 'react-router-dom';
import { useAuth } from "../../useContext";

function UpdateProfile() {
    return (
        <div className="updateProfile">
            <form className="updateProfile__form">
                <h1>Update Profile</h1>
                <div className="updateProfile__details">
                    <p>Email</p>
                    <div className="updateProfile__input">
                        <input type="email"/>  
                    </div>
                </div>
                <div className="updateProfile__details">
                    <p>Password</p>
                    <div className="updateProfile__input">
                        <input type="password"/>  
                    </div>
                </div>
                <div className="updateProfile__details">
                    <p>Password Confirmation</p>
                    <div className="updateProfile__input">
                        <input type="password"/>  
                    </div>
                </div>
                <button type="submit">Update</button>
            </form>
            <Link to='/user'>Cancel</Link>
        </div>
    )
}

export default UpdateProfile
