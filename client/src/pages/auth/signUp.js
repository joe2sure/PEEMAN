import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signupUser } from '../../redux/actions/authActions.js';
import Spinner from '../../utility/Spinner.js';
import Toaster from '../../utility/Toaster.js';
import '../../styles/pages/signup.css';
import { setError } from '../../redux/reducers/authReducer.js';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get loading and error from Redux state
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(setError("Passwords don't match")); // Dispatch error to Redux
      return;
    }
    const result = await dispatch(signupUser(username, email, password, confirmPassword));
    if (result.success) {
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div className="signup-page">
      {loading && <Spinner />}
      <div className="signup-form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            Sign Up
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

export default SignupPage;
