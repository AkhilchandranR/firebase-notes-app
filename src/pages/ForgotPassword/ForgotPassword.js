import React from 'react';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div className="forgotPassword">
            <form className="forgotPassword__form">
                <h1>Password Reset</h1>
                <div className="forgotPassword__details">
                    <p>Password</p>
                    <div className="forgotPassword__input">
                        <input type="password"/>  
                    </div>
                </div>
                <button type="submit">Reset Password</button>
                <p><Link to="/login">Login</Link></p>
            </form>
            <p>Need an account ? <Link to='/login'>Sign Up</Link></p>
        </div>
    )
}

export default ForgotPassword
