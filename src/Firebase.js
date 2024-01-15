// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtFZEMDdkAuOyQ3gtfgTbPnCAQ0Y5wOAM",
  authDomain: "textit-30e31.firebaseapp.com",
  projectId: "textit-30e31",
  storageBucket: "textit-30e31.appspot.com",
  messagingSenderId: "1039013233849",
  appId: "1:1039013233849:web:46d4cd260f7d362fd9c768",
  measurementId: "G-7DG7TE0SMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;