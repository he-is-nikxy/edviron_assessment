import React, { useEffect, useState } from 'react';
import API from '../api/api';
import TransactionTable from '../components/TransactionTable/TransactionTable';

const SchoolTransactions = () => {
  const [schoolId, setSchoolId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    setError('');
    try {
      const res = await API.get(`/transactions/school/${schoolId}`);
      setTransactions(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load transactions');
      setTransactions([]);
    }
  };

  return (
    <div>
      <h1>Transactions by School</h1>
      <input
        type="text"
        placeholder="Enter School ID"
        value={schoolId}
        onChange={e => setSchoolId(e.target.value)}
      />
      <button onClick={fetchTransactions}>Fetch</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {transactions.length > 0 && <TransactionTable transactions={transactions} />}
    </div>
  );
};

export default SchoolTransactions;
