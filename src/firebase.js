import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


// test  version
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
})

//production version
// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_PRODUCTION_API_KEY,
//   authDomain: process.env.REACT_APP_PRODUCTION_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PRODUCTION_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_PRODUCTION_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_PRODUCTION_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_PRODUCTION_APP_ID,
//   measurementId: process.env.REACT_APP_PRODUCTION_MEASUREMENT_ID
// })

const firestore = app.firestore()

export const database = {
    user: firestore.collection('users')
  }

  export const storage = app.storage()
  export const auth = app.auth()
  
  export default app