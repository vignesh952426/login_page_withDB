# 3D Animated Login Page

A beginner-friendly project with a modern 3D animated login page using HTML, CSS, JavaScript, Node.js, and Express.

## Folder Structure

- `package.json` - npm package metadata and start script
- `server.js` - Express backend server
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

Then open your browser at:

```
http://localhost:3000
```

## Login Credentials

- Username: `admin`
- Password: `password`

## Notes

- The frontend sends the login data to `POST http://localhost:3000/login`.
- The backend validates the credentials and returns a JSON response.
- On success, the page redirects to `dashboard.html`.
