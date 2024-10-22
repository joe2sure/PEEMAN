import React from 'react';
import PropTypes from 'prop-types';
import '../styles/utility/Button.css';

const Button = ({ children, className, type = 'button', onClick }) => {
  return (
    <button
      className={`button ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};

export default Button;