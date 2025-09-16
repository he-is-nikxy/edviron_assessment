const WebhookLog = require('../models/WebhookLog');
const OrderStatus = require('../models/OrderStatus');

exports.handleWebhook = async (req, res) => {
  try {
    const log = new WebhookLog({ payload: req.body });
    await log.save();

    const info = req.body.order_info;
    await OrderStatus.findOneAndUpdate(
      { custom_order_id: info.order_id },
      {
        order_amount: info.order_amount,
        transaction_amount: info.transaction_amount,
        payment_mode: info.payment_mode,
        payment_details: info.payemnt_details,
        bank_reference: info.bank_reference,
        payment_message: info.Payment_message,
        status: info.status,
        error_message: info.error_message,
        payment_time: info.payment_time,
      }
    );

    res.json({ message: 'Webhook processed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
