import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDrZrKnJpbmzYQVMTZVapRB4haq0YnaBjE",
    authDomain: "recipe-mykitchen.firebaseapp.com",
    projectId: "recipe-mykitchen",
    storageBucket: "recipe-mykitchen.appspot.com",
    messagingSenderId: "126606950463",
    appId: "1:126606950463:web:492cd5c5e9b6804778b88a",
    measurementId: "G-SB96H9HRP3"
};

// initiaize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)

export { auth, googleProvider }