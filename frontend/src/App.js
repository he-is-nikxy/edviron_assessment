import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SchoolTransactions from './pages/SchoolTransactions';
import TransactionStatusPage from './pages/TransactionStatusPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Register from './pages/Register';

const PrivateRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/school-transactions" element={<PrivateRoute><SchoolTransactions /></PrivateRoute>} />
        <Route path="/transaction-status" element={<PrivateRoute><TransactionStatusPage /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
