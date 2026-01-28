import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAq_HvE6qV3HmSr9r9YRd8hf5QFw5BykaQ",
  authDomain: "occasionaly-b8731.firebaseapp.com",
  projectId: "occasionaly-b8731",
  storageBucket: "occasionaly-b8731.firebasestorage.app",
  messagingSenderId: "766589425076",
  appId: "1:766589425076:web:ea6dffecb1fea62812cee1",
  measurementId: "G-QP5YDLZPDS",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { serverTimestamp };


