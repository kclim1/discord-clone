# Discord Clone

Welcome to **Discord Clone**, a personal project aimed at exploring and understanding the underlying technologies that power real-time chat applications like Discord. This project serves as both a learning tool and a platform to experiment with modern web development and real-time communication features.

## Motivation

The primary motivation behind building this clone is to gain a deeper understanding of:
- Real-time communication using **Socket.IO**.
- Backend and frontend integration in full-stack applications.
- Technologies that enable features like chat rooms, direct messaging, and user presence.
- Building scalable and maintainable architectures for modern web apps.

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
    git clone https://github.com/yourusername/chord.git
    ```
2. Navigate to the project directory:
    ```sh
    cd chord
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

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

