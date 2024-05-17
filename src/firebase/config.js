// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9fLExODfqBamD7zQPAqx5ozC8eRCQzAw",
  authDomain: "miniblogreact-46539.firebaseapp.com",
  projectId: "miniblogreact-46539",
  storageBucket: "miniblogreact-46539.appspot.com",
  messagingSenderId: "314081342890",
  appId: "1:314081342890:web:89fc4d1b265ea8979327d3",
  measurementId: "G-7C98GFLLDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Banco de dados do Firebase
const db = getFirestore (app)
export {db};