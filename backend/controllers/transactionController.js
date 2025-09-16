
const Order = require('../models/Order');

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Order.aggregate([
      {
        $lookup: {
          from: 'orderstatuses', 
          localField: '_id',
          foreignField: 'collect_id',
          as: 'status_info',
        },
      },
      {
        $unwind: {
          path: '$status_info',
          preserveNullAndEmptyArrays: true, 
        },
      },
      {
        $project: {
          collect_id: '$_id',
          school_id: 1,
          gateway: '$gateway_name',
          order_amount: '$status_info.order_amount',
          transaction_amount: '$status_info.transaction_amount',
          status: '$status_info.status',
          custom_order_id: '$status_info.custom_order_id',
        },
      },
    ]);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
