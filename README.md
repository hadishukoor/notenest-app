# NoteNest - A Full-Stack MERN Note-Taking App

A secure and modern note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can register, log in, and manage their personal notes in a private and intuitive interface.

## Features

- **Secure User Authentication:** Signup and Login with password hashing (bcryptjs).
- **JWT-Based Sessions:** Secure and stateless session management.
- **CRUD Functionality:** Users can Create, Read, and Delete their own notes.
- **Data Privacy:** Notes are linked to individual users and cannot be accessed by others.
- **Dynamic UI:** A responsive single-page application built with React and React Router.
- **Animated Background:** A live "stars" effect using tsParticles for a modern look.

## Technology Stack

- **Frontend:** React, Vite, React Router, tsParticles
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcryptjs

## How to Run Locally

### Prerequisites

- Node.js installed
- MongoDB Atlas account (or local MongoDB instance)

### 1. Backend Setup

```bash
cd backend
npm install

```
# .env file content
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

node server.js

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev

```


