import React,{ useRef,useState } from 'react';
import './UpdateProfile.css';
import { Link,useHistory } from 'react-router-dom';
import { useAuth } from "../../useContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
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
    
        const promises = []
        setLoading(true)

    
        if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
        }
    
        Promise.all(promises)
          .then(() => {
            history.push("/user")
          })
          .catch(() => {
            toast.error("Failed to update account", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }); 

          })
          .finally(() => {
            setLoading(false)
          })
      }

    return (
        <div className="updateProfile">
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
            <form className="updateProfile__form">
                <h1>Update Profile</h1>
                <div className="updateProfile__details">
                    <p>Email</p>
                    <div className="updateProfile__input">
                        <input type="email" ref={emailRef} required defaultValue={currentUser.email}/>  
                    </div>
                </div>
                <div className="updateProfile__details">
                    <p>Password</p>
                    <div className="updateProfile__input">
                        <input type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>  
                    </div>
                </div>
                <div className="updateProfile__details">
                    <p>Password Confirmation</p>
                    <div className="updateProfile__input">
                        <input type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/>  
                    </div>
                </div>
                <button type="submit" disabled={loading} onClick={handleSubmit}>Update</button>
            </form>
            <Link to='/user'>Cancel</Link>
        </div>
    )
}

export default UpdateProfile
