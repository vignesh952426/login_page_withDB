# 3D Animated Login Page

A beginner-friendly project with a secure Node.js and Express backend for a 3D animated login page.

## Folder Structure

- `package.json` - npm package metadata and dependencies
- `server.js` - Express backend server with rate limiting and bcrypt hashing
- `public/index.html` - login page
- `public/style.css` - page styles
- `public/script.js` - frontend login logic
- `public/dashboard.html` - success dashboard page

## Install and Run

Open the VS Code terminal and run:

```powershell
cd "c:\Users\Vigne\OneDrive\Desktop\LOGIN PB"
npm install
npm start
```

If you want to install the security packages manually, run:

```powershell
npm install express-rate-limit bcrypt helmet
```

Then open your browser at:

```text
http://localhost:3000
```

## Login Credentials

- Username: `admin`
- Password: `password`

## Security Features

- Rate limiting: 5 failed login attempts per IP every 15 minutes
- Account lockout: `admin` locked for 15 minutes after 5 wrong password attempts
- Delay after failed login attempts to slow brute-force attacks
- Helmet headers enabled for improved security
- Passwords validated using bcrypt hashing

## Notes

- Frontend sends login data with `fetch()` to `POST http://localhost:3000/login`.
- Backend returns JSON with `success` and `message`.
- On success, the frontend redirects to `dashboard.html`.
