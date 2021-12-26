import React,{ useRef,useState } from 'react';
import './Login.css';
import { Link,useHistory } from 'react-router-dom';
import { useAuth } from "../../useContext";

function Login() {
   const emailRef = useRef()
   const passwordRef = useRef()
   const { login } = useAuth()
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const history = useHistory()

   async function handleLogin(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

    return (
        <div className="login">
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
                    <Link to="/">Forgot Password?</Link>
                </div>
            </form>
            <p>Need an account ? <Link to='/signup'>Sign Up</Link></p>
        </div>
    )
}

export default Login
