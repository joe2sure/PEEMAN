/* global google */


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, googleLoginUser } from '../../redux/actions/authActions';
import Spinner from '../../utility/Spinner';
import Toaster from '../../utility/Toaster';
import '../../styles/pages/login.css';
import { setError } from '../../redux/reducers/authReducer';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get loading and error from Redux state
  const { loading, error } = useSelector((state) => state.auth);

  // Load Google Identity script
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "26266068124-u07a6voluqg99ichd35kojt7v3cijs69.apps.googleusercontent.com",
          callback: handleGoogleLoginResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          { theme: "outline", size: "large" }
        );
      }
    };
  
    const googleScript = document.createElement('script');
    googleScript.src = "https://accounts.google.com/gsi/client";
    googleScript.async = true;
    googleScript.defer = true;
    googleScript.onload = initializeGoogleSignIn;
    googleScript.onerror = () => {
      console.error('Google Sign-In script failed to load.');
    };
    document.body.appendChild(googleScript);
  
    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(googleScript);
    };
  }, []);
  
  // useEffect(() => {
  //   const initializeGoogleSignIn = () => {
  //     google.accounts.id.initialize({
  //       client_id: "26266068124-u07a6voluqg99ichd35kojt7v3cijs69.apps.googleusercontent.com", // Replace with your Google Client ID
  //       callback: handleGoogleLoginResponse,
  //     });
  //     google.accounts.id.renderButton(
  //       document.getElementById("google-signin-button"),
  //       { theme: "outline", size: "large" }
  //     );
  //   };

  //   const googleScript = document.createElement('script');
  //   googleScript.src = "https://accounts.google.com/gsi/client";
  //   googleScript.onload = initializeGoogleSignIn;
  //   document.body.appendChild(googleScript);
  // }, []);


 
  const handleGoogleLoginResponse = async (response) => {
    const tokenId = response.credential;
    const result = await dispatch(googleLoginUser(tokenId));  // Dispatch Google login action
    if (result.success) {
      navigate('/');
    }
  };

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

        <div className="google-signin-container">
          <div id="google-signin-button"></div> {/* Google login button */}
        </div>
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



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { loginUser } from '../../redux/actions/authActions.js';
// import Spinner from '../../utility/Spinner.js';
// import Toaster from '../../utility/Toaster.js';
// import '../../styles/pages/login.css';
// import { setError } from '../../redux/reducers/authReducer.js';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get loading and error from Redux state
//   const { loading, error } = useSelector(state => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await dispatch(loginUser(email, password));
//     if (result.success) {
//       setTimeout(() => navigate('/'), 2000);
//     }
//   };

//   return (
//     <div className="login-page">
//       {loading && <Spinner />}
//       <div className="login-form-container">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="submit-button" disabled={loading}>
//             Login
//           </button>
//         </form>
//       </div>
//       {/* Display Toaster only if error exists */}
//       {error && (
//         <Toaster
//           message={error}
//           type="error"
//           onClose={() => dispatch(setError(null))} // Clear error on toaster close
//         />
//       )}
//     </div>
//   );
// };

// export default LoginPage;