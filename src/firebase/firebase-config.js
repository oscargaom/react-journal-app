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
    apiKey: config.fb_api_key,
    authDomain: config.fb_auth_domain,
    databaseURL: config.fb_database_url,
    projectId: config.fb_project_id,
    storageBucket: config.fb_storage_bucket,
    messagingSenderId: config.fb_messaging_sender_id,
    appId: config.fb_app_id
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