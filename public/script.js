// script.js
// Handles frontend login and communicates with the backend using fetch.

const loginForm = document.getElementById('loginForm');
const messageElement = document.getElementById('message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Read the username and password values from the form.
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Reset message text.
  messageElement.textContent = '';
  messageElement.className = 'message';

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      messageElement.textContent = data.message;
      messageElement.classList.add('success');

      // Wait a short moment to let the user see the message,
      // then redirect to the dashboard page.
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    } else {
      messageElement.textContent = data.message;
      messageElement.classList.add('error');
    }
  } catch (error) {
    messageElement.textContent = 'Unable to connect to the server.';
    messageElement.classList.add('error');
    console.error('Login error:', error);
  }
});
