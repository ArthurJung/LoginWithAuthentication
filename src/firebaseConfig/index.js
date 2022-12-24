import firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLLb4l69BBIIQARWQuLgl97RQEwTSpMsk",
  authDomain: "authentication-bf389.firebaseapp.com",
  projectId: "authentication-bf389",
  storageBucket: "authentication-bf389.appspot.com",
  messagingSenderId: "320842277266",
  appId: "1:320842277266:web:f063d9677b0c47c0a2a14b"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
