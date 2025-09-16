import React, { useState } from 'react';
import API from '../../api/api';
import './TransactionStatus.css';

const TransactionStatus = () => {
  const [customOrderId, setCustomOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const checkStatus = async () => {
    setError('');
    setStatus('');
    try {
      const res = await API.get(`/transaction-status/${customOrderId}`);
      setStatus(res.data.status);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch transaction status');
    }
  };

  return (
    <div className="transaction-status-container">
      <input
        type="text"
        placeholder="Enter Custom Order ID"
        value={customOrderId}
        onChange={(e) => setCustomOrderId(e.target.value)}
      />
      <button onClick={checkStatus}>Check Status</button>
      {status && <p>Status: {status}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TransactionStatus;
