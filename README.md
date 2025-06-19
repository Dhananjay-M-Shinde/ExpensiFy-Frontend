# ExpensiFy Frontend

A modern, responsive React frontend for personal expense management with comprehensive analytics and profile management.

## 🌟 Features

- **User Authentication**: Secure login/registration with JWT tokens and refresh token handling
- **Profile Management**: Complete user profile with avatar upload and password change
- **Expense Management**: Full CRUD operations for expenses with category tracking
- **Interactive Analytics**: Beautiful daywise expense charts with hover effects and breakdowns
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Real-time Updates**: Live expense statistics and category breakdowns
- **Modern UI/UX**: Clean glassmorphism design with Tailwind CSS and smooth animations
- **File Upload**: Drag-and-drop avatar upload with preview functionality
- **Error Handling**: Comprehensive error handling with toast notifications

## 🔧 Tech Stack

- **React 18**: Modern frontend framework with hooks
- **Redux Toolkit**: Efficient state management with RTK Query
- **React Router Dom**: Client-side routing and navigation
- **Axios**: HTTP client with interceptors for auth
- **React Hook Form**: Performant form handling with validation
- **Yup**: Schema validation for forms
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **React Hot Toast**: Elegant notification system
- **Vite**: Lightning-fast build tool and dev server

## 📊 Key Components

- **Dashboard**: Central hub with expense overview and quick actions
- **Profile Management**: Complete user profile with avatar and account settings
- **Expense Analytics**: Interactive SVG charts with daywise expense visualization
- **Expense List**: Comprehensive expense management with filtering
- **Authentication**: Secure login/register forms with validation

## 🚀 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- ExpensiFy Backend API running on `http://localhost:8000`

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ExpensiFy-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── charts/         # Data visualization components
│   ├── expense/        # Expense management components
│   └── ui/            # Reusable UI components
├── pages/             # Main application pages
├── services/          # API services and utilities
├── store/             # Redux store and slices
└── utils/             # Helper functions and utilities
```

## 🎯 Features Implemented

### Authentication & Profile
- ✅ User registration with avatar upload
- ✅ Secure login with JWT tokens
- ✅ Token refresh mechanism
- ✅ Profile view and edit functionality
- ✅ Avatar upload and preview
- ✅ Password change with validation

### Expense Management
- ✅ Add new expenses with categories
- ✅ Edit existing expenses
- ✅ Delete expenses with confirmation
- ✅ View expense history
- ✅ Category-wise organization

### Analytics & Visualization
- ✅ Interactive daywise expense chart
- ✅ Hover effects and tooltips
- ✅ Responsive chart design
- ✅ Summary statistics cards
- ✅ Mobile-optimized charts

### UI/UX Enhancements
- ✅ Glassmorphism design elements
- ✅ Smooth animations and transitions
- ✅ Mobile-responsive layouts
- ✅ Toast notifications
- ✅ Loading states and error handling

## 🌐 API Integration

The frontend integrates with the ExpensiFy backend API for:
- User authentication and profile management
- Expense CRUD operations
- File uploads for avatars
- Daywise expense analytics

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Adaptive layouts for all screen sizes
- Touch-friendly interface elements
- Optimized chart displays for mobile
- Reduced spacing and font sizes on smaller screens

## 🔐 Security Features

- JWT token management with automatic refresh
- Protected routes requiring authentication
- Secure API communication with interceptors
- Input validation and sanitization
