import React, { useState, useEffect } from 'react';
import '../styles/utility/Toaster.css';

const Toaster = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`toaster ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toaster;