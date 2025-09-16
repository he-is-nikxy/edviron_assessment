require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderStatusRoutes = require('./routes/orderStatusRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
// const orderStatusRoutes = require('./routes/orderStatusRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-status', orderStatusRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/order-status', orderStatusRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
