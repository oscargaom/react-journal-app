import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from "../config";

/*  Se obtiene de la consola del sitio de firebase en 
    Add Firebase to your web app.
    Register app.
    Add firebase SDK.
*/
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: config.FB_API_KEY,
    authDomain: config.FB_AUTH_DOMAIN,
    databaseURL: config.FB_DATABASE_URL,
    projectId: config.FB_PROJECT_ID,
    storageBucket: config.FB_STORAGE_BUCKET,
    messagingSenderId: config.FB_MESSAGING_SENDER_ID,
    appId: config.FB_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
};