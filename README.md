# Clothing Store Web Application

A full-stack e-commerce clothing store built with modern web technologies.

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Material-UI for components
- Redux Toolkit for state management
- React Router for routing
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin resource sharing

## Project Structure
```
clothing-store/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── features/   # Redux slices
│   │   ├── services/   # API services
│   │   ├── types/      # TypeScript types
│   └── ...
└── backend/            # Express backend application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/      # Mongoose models
    │   ├── routes/      # API routes
    │   ├── middleware/  # Custom middleware
    │   └── utils/       # Utility functions
    └── ...
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development servers:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm run dev
   ```

## Features

- User authentication (signup/login)
- Product browsing and searching
- Shopping cart functionality
- Order management
- Admin dashboard for product management
- Responsive design for mobile and desktop

## License

MIT
