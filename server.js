// server.js
// Simple Express backend for the login page

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS so the frontend can call this API from the same machine.
app.use(cors());

// Parse JSON bodies sent by the frontend.
app.use(express.json());

// Serve static frontend files from the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// POST /login endpoint accepts username and password.
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate credentials.
  if (username === 'admin' && password === 'password') {
    return res.json({
      success: true,
      message: 'Login successful'
    });
  }

  // Incorrect credentials.
  return res.json({
    success: false,
    message: 'Invalid username or password'
  });
});

// Start the server.
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
