import React,{ useRef,useState } from 'react';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../../useContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [loading, setLoading] = useState(false)

    async function ResetPassword(e) {
        e.preventDefault()
    
        try {
          setLoading(true)
          await resetPassword(emailRef.current.value)
          toast.success('Check your inbox for further instructions', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

        } catch {
          toast.error("Failed to reset password", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
    
        setLoading(false)
      }

    return (
        <div className="forgotPassword">
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
            <form className="forgotPassword__form">
                <h1>Password Reset</h1>
                <div className="forgotPassword__details">
                    <p>Email</p>
                    <div className="forgotPassword__input">
                        <input type="email" ref={emailRef}/>  
                    </div>
                </div>
                <button type="submit" disabled={loading} onClick={ResetPassword}>Reset Password</button>
                <p><Link to="/login">Login</Link></p>
            </form>
            <p>Need an account ? <Link to='/signup'>Sign Up</Link></p>
        </div>
    )
}

export default ForgotPassword
