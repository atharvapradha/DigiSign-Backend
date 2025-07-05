# DigiSign Backend

This is the **backend server** for **DigiSign**, a MERN stack application that allows users to digitally sign PDF files. The backend is built using **Node.js**, **Express.js**, and **MongoDB**. It handles authentication, file uploads, signature embedding, and user data storage.

## 📁 Project Structure
Backend/
├── config/           # Configuration files (e.g., DB connection)
├── controllers/      # Route handler logic
├── middleware/       # Custom middleware (e.g., auth, error handling)
├── models/           # Mongoose schemas and data models
├── node_modules/     # Node.js dependencies
├── routes/           # Express route definitions
├── uploads/          # Folder for uploaded PDF files
├── utils/            # Utility functions (e.g., PDF processing)
├── .env              # Environment variables (DO NOT commit this)
├── package.json      # NPM dependencies and scripts
├── package-lock.json # Lock file for exact dependency versions
├── README.md         # Project documentation
└── server.js         # Entry point of the backend server

## 🚀 Features

- 🔐 User Authentication (Signup/Login)
- 📤 File Upload and Storage (PDF files)
- ✍️ Digital Signature Embedding using `pdf-lib`
- 📌 Precise Signature Positioning based on frontend drag-drop
- 🗃️ MongoDB integration for user and file metadata
- 🧩 RESTful API architecture

## ⚙️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for API handling
- **MongoDB** – NoSQL database (via Mongoose ODM)
- **PDF-lib** – PDF editing and signature embedding
- **Multer** – File upload middleware
- **Dotenv** – Environment variable management
- **CORS** – Cross-Origin Resource Sharing setup
- **Axios** *(frontend)* – HTTP client for API communication

## 📡 API Endpoints

| Method | Endpoint      | Description                          |
| ------ | ------------- | ------------------------------------ |
| POST   | `/api/signup` | Register a new user                  |
| POST   | `/api/signin` | Login for existing user              |
| POST   | `/api/upload` | Upload a PDF file                    |
| GET    | `/api/files`  | Fetch user's uploaded files          |
| POST   | `/api/sign`   | Embed digital signature into the PDF |

## 🔐 Signature Embedding Process

User drags and places a signature on the PDF.

The frontend sends the coordinates and page number to the backend.

Backend uses pdf-lib to embed the signature at the specified location.

The updated PDF is saved, and file status is set to "Signed" in MongoDB.

## 👨‍💻 Author
Atharva Pradhan
🔗 https://github.com/atharvapradha