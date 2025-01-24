# HomeConnect

HomeConnect is a smart home management system focused on energy savings and efficiency, built on the MERN stack. It allows users to monitor and control their smart home devices, optimize energy usage, and receive personalized recommendations to reduce energy consumption.

## Features

- **Real-Time Energy Monitoring**: Track energy usage of connected devices in real-time.
- **Smart Device Control**: Control smart home devices (e.g., lights, air-conditioners) remotely.
- **Energy Efficiency Recommendations**: Receive personalized tips to save energy.
- **User Authentication**: Secure login and registration with JWT (JSON Web Tokens).
- **Role-Based Access**: Different access levels for home owners and home dwellers.
- **Responsive Design**: A user-friendly interface that works on all devices.

## Technologies Used

- **Frontend**: React, Vite, Axios, React Router, Tailwind CSS
- **Backend**: Express.js, Node.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB (with Mongoose for schema modeling)
- **API Testing**: -
- **Version Control**: Git and GitHub
- **Package Manager**: npm/yarn

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Git**
- **MongoDB** (local or cloud-based via MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vijayshawcm/homeconnect.git
   ```
2. Navigate to the project directory:
   ```bash
   cd homeconnect
   ```
3. Set up the backend:

   - Navigate to the `server` folder:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` directory and add the following environment variables:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - Open your browser and navigate to `http://localhost:5000`.

4. Set up the frontend:

   - Navigate to the `client` folder:
     ```bash
     cd ../client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `client` directory and add the following environment variables:
     ```env
     VITE_API_BASE_URL=http://localhost:5000
     ```
   - Start the React app:
     ```bash
     npm run dev
     ```
   - Open your browser and navigate to `http://localhost:5173` (default port for Vite).

## Folder Structure

```
homeconnect/
├── client/                 # Frontend (React) code
│   ├── public/             # Static assets
│   ├── src/                # Source code for the React app
│   ├── .env                # Frontend environment variables
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.js      # Vite configuration
├── server/                 # Backend (Node.js + Express) code
│   ├── config/             # Configuration files
│   ├── controllers/        # Logic for handling API requests
│   ├── middleware/         # Custom middleware functions
│   ├── models/             # MongoDB models (Mongoose schemas)
│   ├── routes/             # API route definitions
│   ├── services/           # External service integrations
│   ├── utils/              # Utility functions and helpers
│   ├── .env                # Backend environment variables
│   ├── app.js              # Main Express application setup
│   ├── server.js           # Entry point for backend server
│   └── package.json        # Backend dependencies and scripts
├── config/                 # Shared configuration files
├── scripts/                # Utility scripts for deployment, testing, etc.
├── tests/                  # Test files for both frontend and backend
├── docs/                   # Documentation files
├── .env                    # Root environment variables (if needed)
├── .gitignore              # Specifies files and folders to ignore in Git
└── README.md               # Project overview and documentation
```

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---
