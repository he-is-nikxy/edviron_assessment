import React, { useEffect, useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import CreateOrder from '../components/CreateOrder/CreateOrder';
import './Dashboard.css';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [schools, setSchools] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/transactions');
        setOrders(res.data || []);
        const uniqueSchools = [...new Set((res.data || []).map(order => order.school_id))];
        setSchools(uniqueSchools);
        setFilteredOrders(res.data || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      }
    };
    fetchOrders();
  }, [refresh]); 

  useEffect(() => {
    let filtered = orders;

    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (selectedSchools.length > 0) {
      filtered = filtered.filter(order => selectedSchools.includes(order.school_id));
    }

    if (!statusFilter && selectedSchools.length === 0) {
      filtered = orders;
    }

    if (statusFilter && selectedSchools.length === 0) {
      filtered = orders.filter(order => order.status === statusFilter);
    }

    if (filtered.length === 0) {
      setError('No orders match the selected filters.');
    } else {
      setError('');
    }

    if (filtered.length > 100) {
      filtered = filtered.slice(0, 100);
      setError('Too many results. Showing first 100 orders.');
    }

    

    setFilteredOrders(filtered);
  }, [orders, statusFilter, selectedSchools]);

  const handleOrderCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Transactions Overview</h1>
        <button className="logout-button" onClick={logout}>Logout</button>
      </header>

      <section className="filters-container">
        <label>
          Status Filter:
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </label>

        <label>
          Filter by Schools:
          <select multiple value={selectedSchools} onChange={e => {
            const options = e.target.options;
            const selected = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) selected.push(options[i].value);
            }
            setSelectedSchools(selected);
          }}>
            {schools.map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>
        </label>
      </section>

      <CreateOrder onOrderCreated={handleOrderCreated} /> 

      <table className="orders-table">
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
          {filteredOrders.length === 0 ? (
            <tr><td colSpan="7" style={{ textAlign: 'center' }}>No orders found.</td></tr>
          ) : (
            filteredOrders.map(order => (
              <tr key={order.collect_id}>
                <td>{order.collect_id}</td>
                <td>{order.school_id}</td>
                <td>{order.gateway}</td>
                <td>{order.order_amount ?? 'N/A'}</td>
                <td>{order.transaction_amount ?? 'N/A'}</td>
                <td>{order.status || 'Unknown'}</td>
                <td>{order.custom_order_id || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
