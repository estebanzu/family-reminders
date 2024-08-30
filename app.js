// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

document.addEventListener('DOMContentLoaded', () => {
    const reminderForm = document.getElementById('reminderForm');
    const remindersList = document.getElementById('remindersList');

    // Load reminders from Firestore when the page loads
    loadReminders();

    // Add a reminder
    reminderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const reminderDate = document.getElementById('reminderDate').value;
        const reminderText = document.getElementById('reminderText').value;
        if (reminderDate && reminderText) {
            addReminder(reminderDate, reminderText);
            reminderForm.reset();
        }
    });

    // Function to add a reminder to Firestore
    async function addReminder(date, text) {
        try {
            const docRef = await addDoc(collection(db, "reminders"), {
                date: date,
                text: text
            });
            console.log("Document written with ID: ", docRef.id);
            addReminderToList(date, text); // Update UI after adding to Firestore
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // Function to load all reminders from Firestore
    async function loadReminders() {
        try {
            const querySnapshot = await getDocs(collection(db, "reminders"));
            querySnapshot.forEach((doc) => {
                const reminder = doc.data();
                addReminderToList(reminder.date, reminder.text);
            });
        } catch (e) {
            console.error("Error getting documents: ", e);
        }
    }

    // Function to add a reminder to the UI list
    function addReminderToList(date, text) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = `${date}: ${text}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => li.remove());

        li.appendChild(span);
        li.appendChild(deleteButton);
        remindersList.appendChild(li);
    }
});
