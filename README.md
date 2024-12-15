# User Posts Management System

A full-stack application for managing users and their posts, built with TypeScript, React, Node.js, and SQLite.

## Features

- View users in a paginated table
- Display user details including address information
- View posts for each user
- Create new posts
- Delete existing posts
- Responsive design
- RESTful API backend

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- React Query
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React (icons)

### Backend

- Node.js
- Express
- TypeScript
- SQLite3
- CORS

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Project Structure

```
├── lema-backend/          # Backend directory
│   ├── config/           # Configuration files
│   ├── src/              # Source files
│   └── data.db           # SQLite database
│
└── lema-frontend/        # Frontend directory
    ├── public/           # Public assets
    └── src/              # Source files
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ayowoleadenuga/lema-fullstack.git
cd lema-fullstack
```

2. Install dependencies:

```bash
# Install backend dependencies
cd lema-backend
npm install

# Install frontend dependencies
cd ../lema-frontend
npm install
```

3. Start the development servers:

```bash
# Start backend server (from /lema-backend directory)
npm run dev

# Start frontend development server (from /lema-frontend directory)
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

## API Endpoints

- `GET /users?pageNumber={number}&pageSize={number}` - Get paginated users
- `GET /users/count` - Get total number of users
- `GET /posts?userId={number}` - Get posts for a specific user
- `POST /posts` - Create a new post
- `DELETE /posts/:id` - Delete a post

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
