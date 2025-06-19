# ExpensiFy Frontend

A modern, responsive React frontend for the ExpensiFy personal expense management application.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Expense Management**: Add, edit, delete, and view expenses
- **Category Tracking**: Organize expenses by categories
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Stats**: View expense statistics and category breakdowns
- **Modern UI**: Clean design with Tailwind CSS

## Tech Stack

- **React 18**: Frontend framework
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Hook Form**: Form handling
- **Yup**: Form validation
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **React Hot Toast**: Notifications
- **Vite**: Build tool

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- ExpensiFy Backend running on `http://localhost:8000`

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
