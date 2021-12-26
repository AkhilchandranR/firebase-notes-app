import React,{ useRef,useState } from 'react';
import './SignUp.css';
import { Link,useHistory } from 'react-router-dom';
import { useAuth } from "../../useContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSignUp(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }); 

      return;
    }

    try {
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/login")
    } catch(error) {
      toast.error("Failed to create an account", {
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
        <div className="signup">
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
            <form className="signup__form">
                <h1>Sign Up</h1>
                <div className="signup__details">
                    <p>Email</p>
                    <div className="signup__input">
                        <input type="email" ref={emailRef} required/>  
                    </div>
                </div>
                <div className="signup__details">
                    <p>Password</p>
                    <div className="signup__input">
                        <input type="password" ref={passwordRef} required/>  
                    </div>
                </div>
                <div className="signup__details">
                    <p>Password Confirmation</p>
                    <div className="signup__input">
                        <input type="password" ref={passwordConfirmRef} required/>  
                    </div>
                </div>
                <button type="submit" disabled={loading} onClick={handleSignUp}>Sign up</button>
            </form>
            <p>Already have an account ? <Link to='/login'>Log In</Link></p>
        </div>
    )
}

export default SignUp
