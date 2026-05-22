// server.js
// Secure Express backend for the login page with rate limiting, account lockout, and bcrypt hashing.

const express = require('express');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Use Helmet to add secure HTTP headers.
app.use(helmet());

// Enable CORS so the frontend can connect to the backend.
app.use(cors());

// Parse JSON request bodies.
app.use(express.json());

// Serve the frontend files from the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// Hard-coded admin user credentials for this demo.
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('password', 10);

// Track failed admin login attempts and lockout state.
const adminAccount = {
  failedAttempts: 0,
  lockedUntil: null
};

// Rate limiter for login route: 5 failed login attempts per 15 minutes per IP.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: 'Too many login attempts. Try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true
});

// Small delay for failed login attempts to slow brute-force attacks.
function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function isAdminLocked() {
  return adminAccount.lockedUntil && Date.now() < adminAccount.lockedUntil;
}

app.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body || {};

  // Generic error response so we do not reveal whether username or password is wrong.
  const invalidLoginResponse = {
    success: false,
    message: 'Invalid username or password'
  };

  // If the admin account is locked, return a lockout message.
  if (username === ADMIN_USERNAME && isAdminLocked()) {
    return res.status(429).json({
      success: false,
      message: 'Too many login attempts. Try again later.'
    });
  }

  // Check the username and password.
  const isAdminUser = username === ADMIN_USERNAME;
  const isPasswordCorrect = isAdminUser && await bcrypt.compare(password || '', ADMIN_PASSWORD_HASH);

  if (isAdminUser && isPasswordCorrect) {
    // Successful login resets the lockout state.
    adminAccount.failedAttempts = 0;
    adminAccount.lockedUntil = null;

    return res.json({
      success: true,
      message: 'Login successful'
    });
  }

  // Delay the response for any failed login attempt.
  await delay(700);

  if (isAdminUser) {
    adminAccount.failedAttempts += 1;

    if (adminAccount.failedAttempts >= 5) {
      adminAccount.lockedUntil = Date.now() + 15 * 60 * 1000; // lock for 15 minutes
    }
  }

  return res.status(401).json(invalidLoginResponse);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
