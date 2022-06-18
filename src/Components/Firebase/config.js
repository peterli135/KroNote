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
  /*YOUR CONFIG HERE*/
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const firestoreDB = getFirestore(app);
const storage = getStorage(app);

export { firestoreDB, storage, ref, uploadBytesResumable, getDownloadURL, collection, addDoc, getDocs, onSnapshot, doc, getDoc, deleteDoc, setDoc };
