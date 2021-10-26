import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbZoRV8sTlGdrTZcPVCjPnKU-x0GF3p5I",
    authDomain: "ejkba-capstone-project.firebaseapp.com",
    projectId: "ejkba-capstone-project",
    storageBucket: "ejkba-capstone-project.appspot.com",
    messagingSenderId: "1026933414220",
    appId: "1:1026933414220:web:997eff59a75c96aa3d57e9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth();

//SignUp
export const signUpFunc = async(email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
}

//SignOut
export const signOutFunc = async() => {
    return await signOut(auth).then(() => {
        return 'signOut successfully'
    }).catch((error) => {
        console.log(error)
    });
}