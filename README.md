
# 🔐 MyAuthApp – Full Stack Authentication System with OTP & Email Recovery

**MyAuthApp** is a complete user authentication system that supports secure registration, login, OTP-based identity verification, and password recovery — all built using the modern MERN stack and designed with a responsive UI using Tailwind CSS.

---

## 🚀 Project Overview

This app helps users:
- Create an account using email and password.
- Login securely using JWT.
- Receive OTP on their email to verify identity.
- Reset their password through a secure OTP-based flow.
- Get beautiful HTML-styled emails for OTP and password reset confirmation.

---

## ✅ Core Features

### 🔐 Authentication
- User Registration with email & password
- Secure Login with JWT token
- Password hashing with **bcrypt**

### 📧 OTP Verification
- OTP sent via email
- OTP expiry after 5 minutes
- Backend validation of OTP before resetting password

### 🔁 Forgot Password Flow
- Users can request an OTP by entering their email
- Password can be reset after successful OTP verification
- Email is sent after successful password reset for confirmation

### 📨 HTML Email Templates
- Clean and styled emails for:
  - OTP Verification
  - Password Reset Confirmation

### 💻 Interactive UI (React + Tailwind CSS)
- Fully responsive, easy-to-use screens:
  - Landing Page
  - Register Page
  - Login Page
  - Forgot Password
  - Verify OTP & Reset Password

---

## ⚙️ Tech Stack

### 🖥 Frontend
- React.js
- Tailwind CSS
- React Router DOM

### 🛠 Backend
- Node.js
- Express.js
- MongoDB with Mongoose

### 🔐 Security & Auth
- JSON Web Token (JWT)
- Bcrypt for password hashing

### 📧 Email Integration
- Nodemailer
- Gmail SMTP (supports port 465 with secure connection)
- Styled HTML emails using template strings

---

## ✉️ Example Emails

### ✅ OTP Email
```html
<h2>OTP Verification</h2>
<p>Your OTP is <strong>123456</strong>.</p>
<p>This OTP will expire in <strong>5 minutes</strong>.</p>
````

### 🔁 Password Reset Confirmation Email

```html
<h2>Password Successfully Updated</h2>
<p>Your password was changed successfully.</p>
<p>If you did not perform this action, please contact support.</p>
```

---

## 📌 Summary

This project provides a production-ready authentication workflow with password recovery, built using modern tools. It’s a great base for:

* Admin dashboards
* SaaS applications
* Internal tools
* User portals

---

## 🙋‍♂️ Author

Built with ❤️ by **\[Saumya sharma]**


```

---


```
