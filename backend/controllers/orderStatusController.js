
const OrderStatus = require('../models/OrderStatus');

exports.createOrUpdateOrderStatus = async (req, res) => {
  const { collect_id, order_amount, transaction_amount, status, custom_order_id } = req.body;

  if (!collect_id) {
    return res.status(400).json({ error: 'collect_id is required' });
  }

  try {
    const existingStatus = await OrderStatus.findOne({ collect_id });

    if (existingStatus) {
      existingStatus.order_amount = order_amount ?? existingStatus.order_amount;
      existingStatus.transaction_amount = transaction_amount ?? existingStatus.transaction_amount;
      existingStatus.status = status ?? existingStatus.status;
      existingStatus.custom_order_id = custom_order_id ?? existingStatus.custom_order_id;

      await existingStatus.save();
      return res.json({ message: 'Order status updated', orderStatus: existingStatus });
    }

    const newStatus = new OrderStatus({
      collect_id,
      order_amount,
      transaction_amount,
      status,
      custom_order_id,
      payment_time: new Date()
    });

    await newStatus.save();
    res.status(201).json({ message: 'Order status created', orderStatus: newStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
