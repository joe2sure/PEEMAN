import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../../redux/actions/authActions.js';
import Spinner from '../../utility/Spinner.js';
import Toaster from '../../utility/Toaster.js';
import '../../styles/pages/login.css';
import { setError } from '../../redux/reducers/authReducer.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get loading and error from Redux state
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(email, password));
    if (result.success) {
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div className="login-page">
      {loading && <Spinner />}
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            Login
          </button>
        </form>
      </div>
      {/* Display Toaster only if error exists */}
      {error && (
        <Toaster
          message={error}
          type="error"
          onClose={() => dispatch(setError(null))} // Clear error on toaster close
        />
      )}
    </div>
  );
};

export default LoginPage;