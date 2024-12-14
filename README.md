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

## Deployment

### Backend Deployment (Railway)

1. Create a new project on [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Add the following environment variables in Railway:
   - `PORT=3000`
   - `NODE_ENV=production`
4. Deploy using the following commands:

```bash
cd lema-backend
railway up
```

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Create a new project on [Vercel](https://vercel.com)
3. Import your repository
4. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add environment variables:
   - `VITE_API_URL=your-railway-backend-url`
6. Deploy!

## Development

### Running Tests

```bash
# Backend tests
cd lema-backend
npm run test

# Frontend tests
cd lema-frontend
npm run test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
