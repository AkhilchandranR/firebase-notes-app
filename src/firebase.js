import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// test  version
const app = firebase.initializeApp({
  apiKey: "AIzaSyCFChOP8ac-GR99yQwmMDAWkioje91tX9g",
  authDomain: "notes-67208.firebaseapp.com",
  projectId: "notes-67208",
  storageBucket: "notes-67208.appspot.com",
  messagingSenderId: "307463379627",
  appId: "1:307463379627:web:43b0a98d339273b55df5ee",
  measurementId: "G-FNBEVPNGMW"
})

const firestore = app.firestore()

export const database = {
    folders: firestore.collection("folders"),
    files: firestore.collection("files"),
    stamp: firebase.firestore.FieldValue.serverTimestamp,
  
  }

  export const storage = app.storage()
  export const auth = app.auth()
  
  export default app