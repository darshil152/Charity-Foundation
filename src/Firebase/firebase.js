

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';  // <----
let firebaseApp;
SetupFirebase();

/**
* Firebase Initialization Function
* This must be called before any firebase query
*/
function SetupFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyD76pcy6A6jz0XsJkP1DUJExjTZIziiM_k",
        authDomain: "ecommerce-82292.firebaseapp.com",
        databaseURL: "https://ecommerce-82292-default-rtdb.firebaseio.com",
        projectId: "ecommerce-82292",
        storageBucket: "ecommerce-82292.appspot.com",
        messagingSenderId: "982080645118",
        appId: "1:982080645118:web:512264ac26c3663b9802af",
        measurementId: "G-90NJ7TYB73"
    };
    // Initialize Firebase
    firebaseApp = firebase.initializeApp(firebaseConfig);
}

export default firebaseApp;
