// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Function to check if environment variable is set
function isEnvVarSet(variableName) {
  if (!process.env[variableName]) {
    console.error(`Error: Environment variable ${variableName} is not set.`);
    return false;
  }
  return true;
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: isEnvVarSet('REACT_APP_FIREBASE_API_KEY') ? process.env.REACT_APP_FIREBASE_API_KEY : null,
  authDomain: isEnvVarSet('REACT_APP_FIREBASE_AUTH_DOMAIN') ? process.env.REACT_APP_FIREBASE_AUTH_DOMAIN : null,
  projectId: isEnvVarSet('REACT_APP_FIREBASE_PROJECT_ID') ? process.env.REACT_APP_FIREBASE_PROJECT_ID : null,
  storageBucket: isEnvVarSet('REACT_APP_FIREBASE_STORAGE_BUCKET') ? process.env.REACT_APP_FIREBASE_STORAGE_BUCKET : null,
  messagingSenderId: isEnvVarSet('REACT_APP_FIREBASE_MESSAGING_SENDER_ID') ? process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID : null,
  appId: isEnvVarSet('REACT_APP_FIREBASE_APP_ID') ? process.env.REACT_APP_FIREBASE_APP_ID : null,
  measurementId: isEnvVarSet('REACT_APP_FIREBASE_MEASUREMENT_ID') ? process.env.REACT_APP_FIREBASE_MEASUREMENT_ID : null
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set auth persistence
setPersistence(auth, inMemoryPersistence);

export { auth, db };