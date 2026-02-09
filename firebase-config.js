// ============================================================
// FIREBASE CONFIGURATION
// ============================================================

// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDbtbxlzWsRL4nZ3YyjSkW7DFmqMsdwfk",
    authDomain: "colloquium-26.firebaseapp.com",
    projectId: "colloquium-26",
    storageBucket: "colloquium-26.firebasestorage.app",
    messagingSenderId: "467903040407",
    appId: "1:467903040407:web:cd56e1e700ff45b7f752d2",
    measurementId: "G-EMPLCFJW8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export for use in other files
export { 
    db, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp 
};