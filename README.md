# cuvetttech

![Logo]("[cuvettIcon.svg](https://github.com/fazil8848/cuvetttech/blob/main/cuvettIcon.svg)")

A full-stack Job Posting Board with Email Automation system that allows companies to register, verify accounts via email, post job openings, and automate emails to candidates.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login using OTP-based authentication.
- Job posting functionality for registered companies.
- Automated email notifications to candidates.
- Dashboard for creating and managing job interviews.
- Protected routes using JWT for authentication.
- React Hot Toast for notifications.

## Technologies Used

### Frontend:

- React.js
- React Router
- Tailwind CSS
- React Hot Toast

### Backend:

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Nodemailer for email services

## Installation

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. **Install dependencies for both frontend and backend:

For the backend:

  ```bash
    cd backend
    npm install
```
For the frontend:
   ```bash
    cd ../frontend
    npm install
```
3  **Set up the environment variables:

Create a .env file in the backend directory with the following details:

  ```bash
    MONGO_URI=mongodb://localhost:27017/your-database-name
    JWT_SECRET=your_jwt_secret
    SMTP_HOST=smtp.your-email-provider.com
    SMTP_PORT=your-smtp-port
    SMTP_USER=your-email@example.com
    SMTP_PASS=your-email-password
```
4. **Start the application:
    Backend:
   ```bash
   cd backend
   npm start
   ```

  Frontend:
  ```bash
   cd backend
   npm run dev
   ```
Open http://localhost:5173 to view the app in your browser.

**Environment Variables
Here are the required environment variables for the backend:

    MONGO_URI: MongoDB connection string.
    JWT_SECRET: Secret key for JWT token generation.
    SMTP_HOST: SMTP server host for sending emails.
    SMTP_PORT: Port number for the SMTP server.
    SMTP_USER: Email address used for sending emails.
    SMTP_PASS: Password for the email account.

**Usage
    After starting the server and frontend, navigate to the registration or login page.
    Register a company account and log in using OTP verification.
    Navigate to the dashboard to post jobs and create interviews.
    Automatic emails will be sent to candidates based on job postings.
    
    ```Folder Structure
    /frontend
      ├── /public
      ├── /src
      │   ├── /components
      │   ├── /services
      │   ├── App.js
      │   └── index.js
      ├── package.json
    /backend
      ├── /controllers
      ├── /models
      ├── /routes
      ├── /utils
      ├── server.js
      ├── .env
      ├── package.json

**Contributing
Contributions are welcome! Follow these steps:

  1. Fork the repository.
  2. Create a new branch: git checkout -b my-feature-branch.
  3. Make your changes and commit them: git commit -m 'Add my feature'.
  4. Push to the branch: git push origin my-feature-branch.
  5. Submit a pull request.

**License
This project is licensed under the MIT License. See the LICENSE file for details.


### Explanation of Sections:
- **Project Name**: Add the name of your project.
- **Features**: List out the key features of the project.
- **Technologies Used**: Mention the tech stack (frontend and backend).
- **Installation**: Detailed instructions to get the project running locally.
- **Environment Variables**: Clearly list all required environment variables.
- **Usage**: Basic instructions on how to use the project.
- **Folder Structure**: Briefly explain the key folders and files.
- **Contributing**: Guidelines for contributing to the project.
- **License**: Add licensing information.

This template should provide a clear understanding of your project for anyone who visits your GitHub repository. Let me know if you need any more customization!

