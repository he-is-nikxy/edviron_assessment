import React, { useState } from 'react';
import API from '../../api/api';
import './OrderStatusForm.css';

const OrderStatusForm = ({ collectId, onStatusUpdated }) => {
  const [formData, setFormData] = useState({
    collect_id: collectId || '',
    order_amount: '',
    transaction_amount: '',
    status: '',
    custom_order_id: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    setFormData(formData => ({ ...formData, collect_id: collectId || '' }));
  }, [collectId]);

  const handleChange = e => {
    setError('');
    setMessage('');
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.collect_id) {
      setError('collect_id is required');
      return;
    }
    try {
      await API.post('/order-status/update', formData);
      setMessage('Order status saved successfully');
      if (onStatusUpdated) onStatusUpdated();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save order status');
    }
  };

  return (
    <form className="order-status-form" onSubmit={handleSubmit}>
      <h3>Update Order Status</h3>
      <input
        name="collect_id"
        placeholder="Collect ID"
        value={formData.collect_id}
        onChange={handleChange}
        required
        readOnly={!!collectId}
      />
      <input
        type="number"
        name="order_amount"
        placeholder="Order Amount"
        value={formData.order_amount}
        onChange={handleChange}
      />
      <input
        type="number"
        name="transaction_amount"
        placeholder="Transaction Amount"
        value={formData.transaction_amount}
        onChange={handleChange}
      />
      <input
        name="status"
        placeholder="Status"
        value={formData.status}
        onChange={handleChange}
      />
      <input
        name="custom_order_id"
        placeholder="Custom Order ID"
        value={formData.custom_order_id}
        onChange={handleChange}
      />
      <button type="submit">Save Status</button>
      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
    </form>
  );
};

export default OrderStatusForm;
