const API_ENDPOINT = "https://backend-{YOUR_PROJECT_ID}.nhost.run/v1/graphql";
const API_KEY = "{YOUR_API_KEY}";

// Fetch and display reminders
async function fetchReminders() {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': API_KEY
    },
    body: JSON.stringify({
      query: `
        query {
          reminders {
            id
            content
            completed
          }
        }
      `
    })
  });

  const data = await response.json();
  displayReminders(data.data.reminders);
}

// Display reminders in the list
function displayReminders(reminders) {
  const remindersList = document.getElementById('reminders');
  remindersList.innerHTML = '';

  reminders.forEach(reminder => {
    const li = document.createElement('li');
    li.textContent = reminder.content;
    remindersList.appendChild(li);
  });
}

// Add new reminder
async function addReminder() {
  const reminderInput = document.getElementById('reminderInput').value;

  if (reminderInput.trim() === '') {
    alert('Please enter a reminder!');
    return;
  }

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': API_KEY
    },
    body: JSON.stringify({
      query: `
        mutation {
          insert_reminders(objects: { content: "${reminderInput}", completed: false }) {
            affected_rows
          }
        }
      `
    })
  });

  if (response.ok) {
    fetchReminders();  // Refresh the reminders list after adding
    document.getElementById('reminderInput').value = '';  // Clear input field
  } else {
    alert('Failed to add reminder.');
  }
}

// Load reminders when the page loads
fetchReminders();
