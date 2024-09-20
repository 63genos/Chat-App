
# ChatApp - Messaging Service Prototype

## Overview
This repository contains the source code for ChatApp, a real-time messaging service prototype built with Firebase and React.js. The application includes features like user registration, authentication, one-to-one and group chat functionality, real-time messaging, and media sharing (images). It also supports optional features like notifications and the use of emojis.

## Features

1. **User Registration and Authentication:**
Firebase Authentication is used to manage user sign-up and login (using email/password).
2. **One-to-One Messaging:**
Real-time text messaging between users.
3. **Group Chat Functionality:**
Users can create group chats and communicate with multiple participants in real-time.
4. **Real-Time Message Updates:**
Messages are synced in real-time using Firebase Realtime Database.
5. **Media Sharing:**
Users can share images in chat via Firebase Storage.

## Technology Stack

### Frontend: 
- **React.js:** Used for building the user interface and managing state.
- **CSS:** For styling the components.
- **React Toastify:** For providing user feedback and notifications in the UI.
- **Vite:** A fast build tool used for running and building the React app.
### Backend (Firebase):
- **Firebase Realtime Database:** For storing and syncing chat messages and user data in real-time.
- **Firebase Authentication:** Used for user registration and login.
- **Firebase Storage:** Handles image uploads and sharing.
- **Firebase Cloud Functions:** (Optional) Can be used for push notifications or other backend processes.

## System Architecture

The application follows a client-server model, with Firebase acting as the backend for data management, authentication, and media storage.

- **Frontend (React):** The client-side of the application where users interact with the interface, send/receive messages, and upload media.
- **Backend (Firebase):** Handles user authentication, real-time message delivery, and image storage.

### Firebase Setup

- **Firebase Authentication:** Provides user sign-up, login, and session management.
- **Firebase Realtime Database:** Enables real-time messaging between users.
- **Firebase Storage:** Stores media files (images) shared in chats.

## Setup and Run Instructions

### Prerequisites:
- **Node.js:** Ensure you have Node.js installed (v14+).
- **Firebase Project:** Create a Firebase project and configure Firebase services (Authentication, Realtime Database, Storage).

### Steps to Set Up the Project Locally:

**1. Clone the Repository:**

```
git clone https://github.com/63genos/Chat-App.git
cd Chat-App
```

**2. Install Dependencies:**

```
npm install
```

**3. Configure Firebase:**
- Create a `.env` file in the root directory and add the following Firebase configuration (replace with your own Firebase details):
```
VITE_FIREBASE_API_KEY=your_api_key
```

**4. Run the Development Server:**

```
npm run dev
```

**5. Build the Project (for Production):**

```
npm run build
```
