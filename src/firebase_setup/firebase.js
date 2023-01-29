import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const REACT_APP_apiKey = "AIzaSyDVH7LHTFW5ij7Y2hY032DFgxv9v2fJqB4";
const REACT_APP_authDomain = "hackatbrown2023-93616.firebaseapp.com";
const REACT_APP_projectId = "hackatbrown2023-93616";
const REACT_APP_storageBucket = "hackatbrown2023-93616.appspot.com";
const REACT_APP_messagingSenderId = "132067981423";
const REACT_APP_appId = "1:132067981423:web:44170fc54ff7a3eff3759a";
const REACT_APP_measurementId = "G-KWDJ2C6MJK";

const firebaseConfig = {
  apiKey: REACT_APP_apiKey,
  authDomain: REACT_APP_authDomain,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
  measurementId: REACT_APP_measurementId,
};

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);

    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
    }

    return null;
  }
}


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export { loginWithGoogle };

// npm install -g firebase-tools
