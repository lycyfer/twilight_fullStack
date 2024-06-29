// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const dataBase = getDatabase(app);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage()
export const db = getFirestore()
export { dataBase };
