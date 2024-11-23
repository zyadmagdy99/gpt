import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyByv_NGNMWvAAa7_IdXRjQc1RcCm2-Y_Is",
  authDomain: "gpt1-aceb7.firebaseapp.com",
  projectId: "gpt1-aceb7",
  storageBucket: "gpt1-aceb7.firebasestorage.app",
  messagingSenderId: "450791283118",
  appId: "1:450791283118:web:b54c01e068bad687c9903f"
};

// Initialize Firebase
const app = getApps().length? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }