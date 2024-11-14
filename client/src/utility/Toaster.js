import React, { useState, useEffect } from 'react';
import '../styles/utility/Toaster.css';

const Toaster = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100); // Initial progress at 100%

  useEffect(() => {
    // Start the timer to hide the toaster after the specified duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    // Progress bar effect
    const progressInterval = setInterval(() => {
      setProgress((prev) => prev - (100 / (duration / 100))); // Reduces by % over duration
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`toaster ${type}`}>
      <p>{message}</p>
      {/* Progress bar */}
      <div className="toaster-progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default Toaster;