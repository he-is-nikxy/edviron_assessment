

const express = require('express');
const router = express.Router();

const { createOrUpdateOrderStatus } = require('../controllers/orderStatusController');

router.post('/update', createOrUpdateOrderStatus);

module.exports = router;

