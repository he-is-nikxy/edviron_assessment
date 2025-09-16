import React, { useState } from 'react';
import API from '../../api/api';
import './CreateOrder.css';

const CreateOrder = ({ onOrderCreated }) => {
  const [formData, setFormData] = useState({
    school_id: '',
    trustee_id: '',
    student_name: '',
    student_id: '',
    student_email: '',
    gateway_name: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setError('');
    setMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        school_id: formData.school_id,
        trustee_id: formData.trustee_id,
        student_info: {
          name: formData.student_name,
          id: formData.student_id,
          email: formData.student_email,
        },
        gateway_name: formData.gateway_name,
      };
      await API.post('/orders', data);
      setMessage('Order created successfully');
      setFormData({
        school_id: '',
        trustee_id: '',
        student_name: '',
        student_id: '',
        student_email: '',
        gateway_name: '',
      });
      if (onOrderCreated) onOrderCreated();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create order');
    }
  };

  return (
    <div className="create-order-container">
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit} className="create-order-form">
        <input
          type="text"
          name="school_id"
          placeholder="School ID (string)"
          value={formData.school_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="trustee_id"
          placeholder="Trustee ID (string)"
          value={formData.trustee_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="student_name"
          placeholder="Student Name"
          value={formData.student_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="student_id"
          placeholder="Student ID"
          value={formData.student_id}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="student_email"
          placeholder="Student Email"
          value={formData.student_email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="gateway_name"
          placeholder="Gateway Name"
          value={formData.gateway_name}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Order</button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CreateOrder;
