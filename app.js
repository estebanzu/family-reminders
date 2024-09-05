document.addEventListener('DOMContentLoaded', () => {
    const reminderForm = document.getElementById('reminderForm');
    const supermarketForm = document.getElementById('supermarketForm');
    const remindersList = document.getElementById('remindersList');
    const buyList = document.getElementById('buyList');
    const submitButton = document.getElementById('submitButton');
    const messageDiv = document.getElementById('message');
    
    // Set the Reminders tab as default
    document.getElementById('RemindersTab').style.display = 'block';
    document.getElementById('SupermarketTab').style.display = 'none';

    // Tab switching logic
    window.openTab = (tabName) => {
        // Hide all tab content
        document.getElementById('RemindersTab').style.display = 'none';
        document.getElementById('SupermarketTab').style.display = 'none';

        // Show the selected tab content
        document.getElementById(tabName).style.display = 'block';
    };

    // Load reminders and supermarket lists
    loadReminders();
    loadSupermarketList();

    // Add Reminder
    reminderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const reminderDate = document.getElementById('reminderDate').value;
        const reminderText = document.getElementById('reminderText').value;
        if (reminderDate && reminderText) {
            addItem('reminders', `reminder-${Date.now()}`, { date: reminderDate, text: reminderText });
            reminderForm.reset();
        }
    });

    // Add Supermarket Item
    supermarketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const buyItemText = document.getElementById('buyItemText').value;
        if (buyItemText) {
            addItem('buyList', `buylist-${Date.now()}`, { text: buyItemText });
            supermarketForm.reset();
        }
    });

    // Additional functions for handling the data, GitHub submission, etc.
    // ...
});
