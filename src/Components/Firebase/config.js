// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/*import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";*/
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, getDoc, onSnapshot, doc, deleteDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUwwjUSjYJUFN_-yVqGCA77l8-_-1XL6w",
  authDomain: "seiji-s-bridge-website-project.firebaseapp.com",
  projectId: "seiji-s-bridge-website-project",
  storageBucket: "seiji-s-bridge-website-project.appspot.com",
  messagingSenderId: "1077921046389",
  appId: "1:1077921046389:web:b0d8a9d04929cd422f3d3c",
  measurementId: "G-RRVF2P6HTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const firestoreDB = getFirestore(app);
const storage = getStorage(app);

export { firestoreDB, storage, ref, uploadBytesResumable, getDownloadURL, collection, addDoc, getDocs, onSnapshot, doc, getDoc, deleteDoc, setDoc };