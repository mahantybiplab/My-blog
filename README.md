# My Blog

A simple blog built with **Node.js** using the **EJS** templating engine for rendering views and providing basic Markdown support for rendering content in posts.

## Features

- User authentication using `bcrypt` for password hashing.
- Session management with `express-session` and `connect-mongo` for MongoDB session storage.
- Blog post creation with support for **Markdown** syntax using the `marked` library.
- EJS templating for dynamic HTML rendering.
- MongoDB for data storage.

## Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MongoDB** running locally or in the cloud (e.g., using MongoDB Atlas).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/my-blog.git
    cd my-blog
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory to store environment variables. Example `.env` file:

    ```env
    MONGO_URI= your_mongoDB_url
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the server in development mode using `nodemon`:

    ```bash
    npm run dev
    ```


The app will start on `http://localhost:8000`.
