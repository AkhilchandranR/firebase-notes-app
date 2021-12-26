import React,{ useRef,useState } from 'react';
import './Login.css';
import { Link,useHistory } from 'react-router-dom';
import { useAuth } from "../../useContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
   const emailRef = useRef()
   const passwordRef = useRef()
   const { login } = useAuth()
   const [loading, setLoading] = useState(false)
   const history = useHistory()

   async function handleLogin(e) {
    e.preventDefault()
    try {
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
        toast.error("Failed to login", {
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
        <div className="login">
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
            <form className="login__form">
                <h1>Login</h1>
                <div className="login__details">
                    <p>Email</p>
                    <div className="login__input">
                        <input type="email" ref={emailRef} required/>  
                    </div>
                </div>
                <div className="login__details">
                    <p>Password</p>
                    <div className="login__input">
                        <input type="password" ref={passwordRef} required/>  
                    </div>
                </div>
                <button type="submit" disabled={loading} onClick={handleLogin}>Login</button>
                <div className="login__forgotPassword">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </form>
            <p>Need an account ? <Link to='/signup'>Sign Up</Link></p>
        </div>
    )
}

export default Login
