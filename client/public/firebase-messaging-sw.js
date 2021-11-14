importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDbZoRV8sTlGdrTZcPVCjPnKU-x0GF3p5I",
    authDomain: "ejkba-capstone-project.firebaseapp.com",
    projectId: "ejkba-capstone-project",
    storageBucket: "ejkba-capstone-project.appspot.com",
    messagingSenderId: "1026933414220",
    appId: "1:1026933414220:web:997eff59a75c96aa3d57e9"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();