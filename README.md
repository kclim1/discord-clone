# Chord 

Welcome to **Chord**, a personal project aimed at exploring and understanding the underlying technologies that power real-time chat applications like Discord. This project serves as both a learning tool and a platform to experiment with modern web development and real-time communication features.For now, Chord only supports 1:1 realtime chat

## Motivation

The primary motivation behind building this clone is to gain a deeper understanding of:
- Real-time communication using **Socket.IO**.
- Backend and frontend integration in full-stack applications.
- Technologies that enable features like chat rooms, direct messaging, and user presence.
- Building scalable and maintainable architectures for modern web apps.

## My Journey
[Development Log Document](https://docs.google.com/document/d/1OsGACqHR30RzmPKl68WVXksb_UotyztTS-WQBXIMZgo/edit?usp=sharing)


## Features

- **User Authentication:**
  - Google and GitHub OAuth integration.
  - Local authentication for flexibility.

- **Real-Time Communication:**
  - Real-time direct messaging between users.
  - Online status indicators.

- **Chat Functionalities:**
  - Persistent chat history tied to chat rooms.
  - Profile pictures and usernames displayed alongside messages.
  - Support for text, images, and other media types (in progress).

- **Community and Friends:**
  - Create and join chat servers.
  - Friend request system with statuses like pending and accepted.

- **Responsive UI:**
  - A user-friendly interface inspired by Discord’s design.
  - Support for both desktop and mobile views.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **React Router**: For managing navigation and routing.
- **Zustand**: For global state management.
- **Tailwind CSS**: For efficient and modern styling.

### Backend
- **Node.js**: For server-side logic.
- **Express**: For handling routes and middleware.
- **Mongoose**: For MongoDB object modeling and database interactions.
- **Socket.IO**: For real-time, bi-directional communication.
- **Cloudinary**: For handling media uploads (profile pictures, etc.).
- **WebRTC**: Coming Soon.

### Database
- **MongoDB**: To store user data, chat history, and server information.

## Goals
- **Learning**: This project is a hands-on way to learn and demystify how real-time chat systems like Discord operate.
- **Improvement**: Enhance my knowledge of full-stack development and the intricacies of technologies like Socket.IO, MongoDB, and OAuth.
- **Experimentation**: Build new features to understand their implementation in real-world applications.

### Prerequisites
1. Node.js and npm installed on your machine.
2. MongoDB instance running locally or on a cloud provider.


### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/kclim1/discord-clone.git
    ```
2. Navigate to the project directory:
    ```sh
    cd discord-clone
    ```
3. Install dependencies for both frontend and backend:
    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

### Running the Application

1. Start the backend server:
    ```sh
    cd backend
    npm start
    ```
2. Start the frontend development server:
    ```sh
    cd frontend
    npm start
    ```

# API Endpoints Documentation

This document provides an overview of the API endpoints implemented in the application, including authentication, user management, and profile-related routes.



## Authentication Routes

### Google Authentication
#### GET `/auth/google`
Initiates Google OAuth login.

- **Description:** Redirects the user to Google's OAuth consent screen.
- **Scope:** `profile`, `email`

#### GET `/auth/google/callback`
Handles the callback from Google OAuth after user consent.

- **Description:** Authenticates the user and redirects to the dashboard if successful.
- **On Success:** Redirects to `/dashboard/:profileId`
- **On Failure:** Returns `401 Unauthorized` with `{ message: "Google login failed" }`

---

### GitHub Authentication
#### GET `/auth/github`
Initiates GitHub OAuth login.

- **Description:** Redirects the user to GitHub's OAuth consent screen.
- **Scope:** `user:email`

#### GET `/auth/github/callback`
Handles the callback from GitHub OAuth after user consent.

- **Description:** Authenticates the user and redirects to the dashboard if successful.
- **On Success:** Redirects to `/dashboard/:profileId`
- **On Failure:** Returns `401 Unauthorized` with `{ message: "GitHub login failed" }`

---

### Local Authentication
#### POST `/auth/login`
Handles local login using username and password.

- **Description:** Authenticates the user locally and redirects to the dashboard if successful.
- **On Success:** Redirects to `/dashboard/:profileId`
- **On Failure:** Returns `401 Unauthorized` with `{ message: "Login failed" }`

---

## User Management Routes

### POST `/signup`
Creates a new user account.

- **Description:** Handles user registration.
- **Request Body:**
  - `username` (string) - The username of the user.
  - `email` (string) - The email address of the user.
  - `password` (string) - The user's password.
- **Validation:** Uses `formValidator` middleware to validate inputs.

---

### GET `/user/:profileId`
Fetches user profile information.

- **Description:** Retrieves profile details for a given user.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user.
- **Response:**
  - `200 OK` with user details.

---

### PUT `/dashboard/:profileid`
Updates user profile information.

- **Description:** Updates profile details such as username, email, or profile picture.
- **Parameters:**
  - `profileid` (string) - The profile ID of the user.
- **Request Body:** Key-value pairs of fields to update.

---

### POST `/auth/logout`
Logs the user out of the application.

- **Description:** Ends the user session and logs the user out.

---

### GET `/auth/session`
Checks if the user session is active.

- **Description:** Verifies if the user is authenticated.
- **Response:**
  - `200 OK` if the session is active.
  - `401 Unauthorized` if the session is inactive.

---

## Middleware

### `formValidator`
Validates the input fields for user registration.

### `isAuthenticated`
Protects routes by ensuring the user is logged in before accessing the resource.

---

# API Endpoints Documentation - Messages and Chats

This document provides an overview of the API endpoints related to messaging, chats, and friend request management.

---

## Friend Requests

### POST `/friend-requests/:profileId`
Sends a friend request to a specified user.

- **Description:** Allows a user to send a friend request to another user.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user to whom the friend request is being sent.
- **Request Body:**
  - `senderId` (string) - The profile ID of the user sending the request.
  - `username` (string) - The username of the sender.
  - `profilePic` (string) - The profile picture of the sender.
- **Response:**
  - `200 OK` on success.
  - `400 Bad Request` if the friend request cannot be sent.

---

## Chat Management

### POST `/new-chat`
Creates a new chat.

- **Description:** Initializes a new chat between participants.
- **Request Body:**
  - `participants` (array) - An array of profile IDs of participants.
- **Response:**
  - `201 Created` on success with chat details.
  - `400 Bad Request` if the chat cannot be created.

### GET `/chats/:profileId`
Fetches all chats a user is involved in.

- **Description:** Retrieves a list of all chats where the user is a participant.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user.
- **Response:**
  - `200 OK` with an array of chat details.

---

## Messaging

### POST `/messages`
Sends a new message.

- **Description:** Sends a message in a specific chat.
- **Request Body:**
  - `senderId` (string) - The profile ID of the sender.
  - `chatId` (string) - The ID of the chat where the message is being sent.
  - `text` (string) - The message content.
  - `profilePic` (string) - The profile picture of the sender.
  - `username` (string) - The username of the sender.
- **Response:**
  - `201 Created` on success with message details.
  - `400 Bad Request` if the message cannot be sent.

### GET `/messages/:chatId`
Fetches all messages for a chat.

- **Description:** Retrieves all messages for a given chat ID.
- **Parameters:**
  - `chatId` (string) - The ID of the chat.
- **Response:**
  - `200 OK` with an array of messages.

---

## Friend Management

### PATCH `/friends/:profileId`
Accepts a friend request.

- **Description:** Allows the user to accept a pending friend request.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user accepting the request.
- **Request Body:**
  - `friendId` (string) - The profile ID of the sender of the friend request.
- **Response:**
  - `200 OK` on success.

### DELETE `/friends/:profileId`
Rejects a friend request.

- **Description:** Allows the user to reject a pending friend request.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user rejecting the request.
- **Request Body:**
  - `friendId` (string) - The profile ID of the sender of the friend request.
- **Response:**
  - `200 OK` on success.

---

# API Endpoints Documentation - Profiles, Friends, and Chats

**Note:** These endpoints are in the process of refactoring. The structure and routes might be subject to change.

---

## Profiles

### GET `/profiles/:profileId`
Fetch a user profile.

- **Description:** Retrieves profile information for a user by their profile ID.
- **Parameters:**
  - `profileId` (string) - The unique identifier of the user profile.
- **Response:**
  - `200 OK` with user profile details.

### Middleware: `loadUserByProfileId`
- **Description:** Middleware that loads the user by `profileId` whenever it is present in the route.
- **Usage:** Automatically executed for routes containing `:profileId`.

---

## Friends

### GET `/profiles/:profileId/friends`
Fetch all friends of a user.

- **Description:** Retrieves a list of all friends for the user with the given profile ID.
- **Parameters:**
  - `profileId` (string) - The unique identifier of the user profile.
- **Response:**
  - `200 OK` with an array of friends.

### GET `/profiles/:profileId/friends/:friendId`
Fetch details of a specific friend.

- **Description:** Retrieves detailed information about a specific friend.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user.
  - `friendId` (string) - The profile ID of the friend.
- **Response:**
  - `200 OK` with friend details.

---

## Chats

### GET `/profiles/:profileId/chats/:chatId`
Fetch details of a specific chat.

- **Description:** Retrieves details of a chat associated with the given chat ID.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user.
  - `chatId` (string) - The unique identifier of the chat.
- **Response:**
  - `200 OK` with chat details.

### POST `/profiles/:profileId/chats`
Create a new chat.

- **Description:** Creates a new chat with the specified participants.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user creating the chat.
- **Request Body:**
  - `participants` (array) - An array of profile IDs of additional participants.
- **Response:**
  - `201 Created` with chat details.

---

## Friend Requests

### GET `/profiles/:profileId/friend-requests`
Fetch all friend requests for a user.

- **Description:** Retrieves all pending friend requests for the user.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user.
- **Response:**
  - `200 OK` with an array of friend requests.

### GET `/profiles/:profileId/friend-requests/:friendRequestId`
Fetch details of a specific friend request.

- **Description:** Retrieves details of a specific friend request.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user.
  - `friendRequestId` (string) - The unique identifier of the friend request.
- **Response:**
  - `200 OK` with friend request details.

### POST `/profiles/:profileId/friend-requests/:friendRequestId/accept`
Accept a friend request.

- **Description:** Accepts a pending friend request for the user.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user accepting the request.
  - `friendRequestId` (string) - The unique identifier of the friend request.
- **Response:**
  - `200 OK` on successful acceptance.

### POST `/profiles/:profileId/friend-requests/:friendRequestId/decline`
Decline a friend request.

- **Description:** Declines a pending friend request for the user.
- **Parameters:**
  - `profileId` (string) - The profile ID of the user declining the request.
  - `friendRequestId` (string) - The unique identifier of the friend request.
- **Response:**
  - `200 OK` on successful decline.

---

## Notes

- **Error Handling:** All routes include proper error handling with descriptive messages.
- **Data Validation:** Inputs are validated at the controller level.
- **Refactoring in Progress:** The routes are being restructured for clarity and scalability.

- **Error Handling:** All routes include error handling with proper status codes and messages.
- **Data Validation:** Inputs are validated at the controller level.
- **Real-Time Integration:** Messaging and chat creation support real-time updates through Socket.IO.
- **Redirect URLs:** The application redirects authenticated users to `/dashboard/:profileId`.
- **Error Handling:** Proper error messages are returned in case of failure for all routes.
- **Session Management:** Sessions are managed using `passport`.

---


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

