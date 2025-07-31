
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "insightly-53zri",
  "appId": "1:821110339823:web:23145eac6d545945a7031a",
  "storageBucket": "insightly-53zri.firebasestorage.app",
  "apiKey": "AIzaSyC-sp0hj8CMd74EuqR-d1RimyvERjnQbVg",
  "authDomain": "insightly-53zri.firebaseapp.com",
  "measurementId": "G-MDCX0WVLQN",
  "messagingSenderId": "821110339823"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
