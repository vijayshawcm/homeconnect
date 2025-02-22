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

- **Frontend**: React (with Vite), React Router, Axios, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB (with Mongoose for schema modeling)
- **API Testing**: -
- **Version Control**: Git and GitHub
- **Package Manager**: npm

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
3. Install root dependencies (for concurrent execution):

   ```bash
   npm install
   ```

4. Set up the backend:

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

5. Set up the frontend:

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

6. To run the React app and server concurrently:

   - Ensure that neither the React app nor the server are running from the previous steps. Stop them first if necessary.

   - Navigate to the project root directory:

     ```bash
     cd homeconnect
     ```

   - Start both the client and server concurrently:

     ```bash
     npm run dev
     ```

## Folder Structure

```
homeconnect/
├── client/                       # Frontend (React) application
│   ├── public/                   # Static assets
│   ├── src/                      # Source code for the React app
│   │   ├── assets/               # Media files (images, fonts, SVG icons)
│   │   ├── components/           # Shared UI components (buttons, cards, etc.)
│   │   ├── features/             # Feature-based modules with self-contained logic
│   │   │   ├── <feature1>/       # Feature module template
│   │   │   │   ├── components/   # Feature-specific UI components
│   │   │   │   ├── hooks/        # Feature-specific custom hooks
│   │   │   │   ├── store/        # Feature-specific state management logic
│   │   │   │   ├── feature1.jsx  # Main entry point/container for this feature
│   │   │   ├── <feature2>/       # Feature module template
│   │   │   ├── <feature3>/       # Feature module template
│   │   ├── hooks/                # Global reusable hooks
│   │   ├── lib/                  # Utility functions and libraries
│   │   ├── pages/                # Page-level components
│   │   ├── routes/               # Centralized Routing config
│   │   ├── store/                # Global state management
│   │   ├── styles/               # Global styles/theming
│   │   ├── App.jsx               # Root application component
│   │   └── main.jsx              # Application entry point
│   ├── .env                      # Frontend environment variables
│   ├── .gitignore                # Files to ignore in version control (frontend)
│   ├── components.json           # ShadCN UI components config
│   ├── eslint.config.js          # ESLint config
│   ├── index.html                # Main HTML entry point (Vite)
│   ├── jsconfig.json             # JavaScript path aliases config
│   ├── package-lock.json         # Auto-generated exact dependency tree
│   ├── package.json              # Frontend dependencies and scripts
│   ├── postcss.config.js         # PostCSS config
│   ├── README.md                 # Frontend-specific documentation
│   ├── tailwind.config.js        # Tailwind CSS config
│   └── vite.config.js            # Vite config
├── server/                       # Backend (Node.js + Express) application
│   ├── config/                   # Config files
│   ├── controllers/              # API controllers
│   ├── middleware/               # Custom middleware functions
│   ├── models/                   # MongoDB models (Mongoose schemas)
│   ├── routes/                   # API route definitions
│   ├── services/                 # External service integrations
│   ├── utils/                    # Utility functions and helpers
│   ├── .env                      # Backend environment variables
│   ├── app.js                    # Main Express application setup
│   ├── package-lock.json         # Auto-generated exact dependency tree
│   ├── package.json              # Backend dependencies and scripts
│   └── server.js                 # Entry point for backend server
├── config/                       # Shared config files
├── scripts/                      # Utility scripts for deployment, testing, etc.
├── tests/                        # Test files for both frontend and backend
├── docs/                         # Documentation files
├── .env                          # Root environment variables (shared)
├── .gitignore                    # Root level git ignore file
├── package-lock.json             # Root dependency tree
├── package.json                  # Root dependencies and shared scripts
└── README.md                     # Project overview and documentation
```

## Contributing

1. Fork the repository.
   - Click the **Fork** button at the top right of the [repository page](https://github.com/vijayshawcm/homeconnect).
2. Clone your fork locally:

   ```bash
   git clone https://github.com/<your-username>/homeconnect.git
   cd homeconnect
   ```

3. Set upstream remote to sync updates:

   ```bash
   git remote add upstream https://github.com/vijayshawcm/homeconnect.git
   ```

4. Create a feature branch to keep your work isolated:

   ```bash
   git checkout -b feature/your-feature-name
   # Example: git checkout -b feature/add-dark-mode
   ```

5. Make your changes.

   - Modify files, add new features, fix bugs, etc.

6. Stage your changes:

   - Ensure that all files you want to commit are added to the staging area:

     ```bash
     git add .
     ```

   - or stage specific files:

     ```bash
     git add path/to/your/changed-file.jsx
     ```

7. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

8. Push your branch to your forked repo:

   ```bash
   git push origin feature/your-feature-name
   ```

9. Open a PR.

   - Go to the [original repository](https://github.com/vijayshawcm/homeconnect) on GitHub and click the **Compare & Pull Request** button.

   - Provide a detailed description of your changes in the PR template.

10. Clean up local and remote branches after merging.

    - Once your PR is approved and merged into the main branch, clean up your local and remote branches.

    - Switch back to main Branch:

      ```bash
      git checkout main
      ```

    - Sync with upstream repo:

      ```bash
      git pull upstream main
      ```

    - Delete local branch:

      ```bash
      git branch -d feature/your-feature-name
      ```

    - Delete remote branch:

      ```bash
      git push origin --delete feature/your-feature-name
      ```

---
