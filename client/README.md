# HomeConnect Client

This is the frontend application for HomeConnect, a smart home management system built with React and Vite.

## 🚀 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + ShadCN UI
- **State Management:** Zustand
- **Routing:** React Router v7
- **Animation:** Framer Motion
- **Form Handling:** Native React (for now or for good tba)
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Animations:** Lottie React

## 📁 Client Structure

```
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── features/
│   │   ├── <feature>/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── store/
│   │   │   └── index.jsx
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── store/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
```

## 🛠️ Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vijayshawcm/homeconnect.git
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory with the following variables:

   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## 🧱 Component Structure

### Feature-based Architecture

We follow a feature-based architecture where each feature is self-contained with its own:

- Components
- Hooks
- State management
- Business logic

### Shared Components

Common UI components are built using ShadCN UI and are located in `src/components/ui/`. These include:

- Buttons
- Cards
- Inputs
- Labels
- Sheets
- Tooltips
- etc.

## 🎨 Styling

- Using Tailwind CSS for styling
- ShadCN UI components for consistent design
- Custom theme configuration in `tailwind.config.js`
- Global styles in `src/styles/`

## 🔒 State Management

- Global state managed with Zustand
- Feature-specific state contained within feature modules
- Authentication state in `src/store/userAuth.jsx`

## 📚 Development Guidelines

1. **Component Creation:**

   - Use functional components with hooks
   - Place shared components in `src/components/`
   - Place feature-specific components in their respective feature folders

2. **Styling:**

   - Use Tailwind CSS classes
   - Follow the project's color scheme and design system
   - Maintain dark mode compatibility (pending integration)

3. **State Management:**

   - Use local state for component-specific state
   - Use Zustand for global state
   - Keep state logic close to where it's used

4. **Code Style:**

   - Follow ESLint configuration
   - Use meaningful variable and function names
   - Write comments for complex logic

5. **Performance:**
   - Optimize images and assets (file format, resizing, compression, etc)

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Stage and commit your changes
4. Push your branch to remote repo
5. Submit a pull request
