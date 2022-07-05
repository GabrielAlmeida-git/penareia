import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAcmFecmRXUIfVF6vyVkcVANylCRlXKO1A",
  authDomain: "penareia-556b0.firebaseapp.com",
  databaseURL: "https://penareia-556b0-default-rtdb.firebaseio.com",
  projectId: "penareia-556b0",
  storageBucket: "penareia-556b0.appspot.com",
  messagingSenderId: "91475408651",
  appId: "1:91475408651:web:d509ec594fad45f372940e",
  measurementId: "G-PTXZYEY6WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app)