import React from 'react';
import './TransactionTable.css';

const TransactionTable = ({ transactions }) => {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Collect ID</th>
          <th>School ID</th>
          <th>Gateway</th>
          <th>Order Amount</th>
          <th>Transaction Amount</th>
          <th>Status</th>
          <th>Custom Order ID</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(tx => (
          <tr key={tx.collect_id}>
            <td>{tx.collect_id}</td>
            <td>{tx.school_id}</td>
            <td>{tx.gateway}</td>
            <td>{tx.order_amount}</td>
            <td>{tx.transaction_amount}</td>
            <td>{tx.status}</td>
            <td>{tx.custom_order_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
