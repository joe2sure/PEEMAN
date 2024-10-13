import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { signupUser } from '../../redux/actions/authActions.js';
import Spinner from '../../utility/Spinner.js';
import Toaster from '../../utility/Toaster.js';
import '../../styles/pages/signup.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toaster, setToaster] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setToaster({ message: "Passwords don't match", type: 'error' });
      return;
    }
    const result = await dispatch(signupUser(email, password));
    if (result.success) {
      setToaster({ message: 'Signup successful', type: 'success' });
      setTimeout(() => navigate('/'), 2000);
    } else {
      setToaster({ message: result.message || 'Signup failed', type: 'error' });
    }
  };

  return (
    <div className="signup-page">
      {loading && <Spinner />}
      <div className="signup-form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
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
      {toaster && (
        <Toaster
          message={toaster.message}
          type={toaster.type}
          onClose={() => setToaster(null)}
        />
      )}
    </div>
  );
};

export default SignupPage;