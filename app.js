document.addEventListener('DOMContentLoaded', () => {
    const reminderForm = document.getElementById('reminderForm');
    const remindersList = document.getElementById('remindersList');
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit to GitHub';
    document.body.appendChild(submitButton);

    // Load reminders from localStorage when the page loads
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

    // Function to add a reminder to localStorage and log it
    function addReminder(date, text) {
        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        reminders.push({ date, text });
        localStorage.setItem('reminders', JSON.stringify(reminders));
        console.log("Updated Reminders: ", JSON.stringify(reminders, null, 2));
        addReminderToList(date, text); // Update UI
    }

    // Function to load reminders from localStorage
    function loadReminders() {
        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        reminders.forEach(reminder => {
            addReminderToList(reminder.date, reminder.text);
        });
    }

    // Function to add a reminder to the UI list
    function addReminderToList(date, text) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = `${date}: ${text}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            deleteReminder(date, text);
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        remindersList.appendChild(li);
    }

    // Function to delete a reminder from localStorage
    function deleteReminder(date, text) {
        let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        reminders = reminders.filter(r => !(r.date === date && r.text === text));
        localStorage.setItem('reminders', JSON.stringify(reminders));
        console.log("Updated Reminders after Deletion: ", JSON.stringify(reminders, null, 2));
    }

    // Submit to GitHub
    submitButton.addEventListener('click', () => {
        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        submitRemindersToGitHub(reminders);
    });

    // Function to submit reminders to GitHub
    async function submitRemindersToGitHub(reminders) {
        const token = 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN'; // Replace with your GitHub token
        const repo = 'YOUR_REPO'; // Replace with your repository name
        const owner = 'YOUR_USERNAME'; // Replace with your GitHub username
        const path = 'path/to/your/file.json'; // Path to the JSON file in the repo

        const content = btoa(JSON.stringify(reminders, null, 2)); // Base64 encode the JSON content

        try {
            // Get the current file's SHA
            const getFileResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });
            const fileData = await getFileResponse.json();
            const sha = fileData.sha;

            // Update the file
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'Updated reminders',
                    content: content,
                    sha: sha,
                }),
            });

            const result = await response.jso
