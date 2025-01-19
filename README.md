# Lonca Supplier Dashboard

A full-stack web application for managing and visualizing vendor sales data. The application consists of a React frontend and Node.js backend.

## Project Structure

```
lonca-supplier-dashboard/
├── client/          # React frontend application
├── server/          # Node.js backend application
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for the backend)

## Getting Started

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with your configuration:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_URL=your_client_url
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Technologies Used

### Frontend
- React
- Vite
- TailwindCSS
- Chart.js

### Backend
- Node.js
- Express
- MongoDB