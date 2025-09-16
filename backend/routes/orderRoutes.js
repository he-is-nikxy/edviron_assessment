const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);

module.exports = router;
