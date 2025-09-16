const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
  collect_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  order_amount: { type: Number },
  transaction_amount: { type: Number },
  status: { type: String },
  custom_order_id: { type: String },
  payment_time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderStatus', orderStatusSchema);
