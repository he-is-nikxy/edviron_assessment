
# Edviron School Management System

## Features
User authentication and registration (Admins, Trustees, Teachers, Staff)

Role-based access and dashboard

Student enrollment and management

Order creation and transaction management

Search and filter by status, school, etc.


## Tech Stack
Frontend: React.js, Context API, Axios, HTML5, CSS3

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: JWT, bcrypt

Other: dotenv, cors, MongoDB Atlas/local


## Getting Started
### Prerequisites
Node.js (v16+ recommended)

MongoDB (local instance or Atlas cloud)

npm

### Backend Setup
cd backend

npm install

Configure .env:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

Start the backend:
node server.js


### Frontend Setup
cd frontend

npm install

Configure .env:
REACT_APP_API_URL=http://localhost:5000/api

Start the frontend:
npm start


## Usage
Access frontend at http://localhost:3000.

Register a new account or login.

Manage schools, students, orders, and transactions from the dashboard.

Update order status/amounts as required.

## Key API Endpoints
POST /api/auth/register – New user registration

POST /api/auth/login – User login

POST /api/orders – Create a new order

GET /api/transactions – Fetch all orders with status

POST /api/order-status/update – Add/update order status details


## Folder Structure
.
├── backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
├── frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── contexts/
│   │   └── App.js
│   └── package.json
└── README.md
