# Authentication System - Next.js

This project implements a simple authentication system using Next.js. It consists of two primary forms: a login form and a registration form. The forms allow users to log in or sign up by sending `POST` requests to a backend API. Upon successful login, users are redirected to the dashboard page.

## Features

- **Login Form**:
  - Accepts user credentials (email and password).
  - Sends a `POST` request to the backend for authentication.
  - Stores the authentication token in `localStorage` upon successful login.

- **Register Form**:
  - Accepts user details (name, username, email, password, confirm password).
  - Validates input fields before sending a registration request to the backend.

- **Responsive Design**:
  - A mobile-friendly design using TailwindCSS.

- **Tab Navigation**:
  - Toggle between login and register forms using tabs.

## Technologies Used

- **Next.js**: React framework for building the user interface.
- **TailwindCSS**: For responsive and styled components.
- **React State**: For managing form input and error handling.
- **Fetch API**: For making HTTP requests to the backend API.
- **LocalStorage**: For storing the authentication token.



