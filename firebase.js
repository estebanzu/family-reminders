// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW8htMe5Q8svTWKf1AdUFqxL3Gd2Pke-M",
  authDomain: "family-reminders-a4c02.firebaseapp.com",
  projectId: "family-reminders-a4c02",
  storageBucket: "family-reminders-a4c02.appspot.com",
  messagingSenderId: "983179216449",
  appId: "1:983179216449:web:e49a7e958ee73c771f28c0",
  measurementId: "G-DE89SFGZSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
