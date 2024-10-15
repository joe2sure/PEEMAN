import React, { useState } from 'react';
import '../../styles/components/home/Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email);
    // Reset the email input
    setEmail('');
  };

  return (
    <section className="newsletter">
      <h2>Subscribe to our newsletter</h2>
      <p>
        We are here to help you build an excellent build. With us, nothing is impossible. 
        See what we have done and what they have to say about our work performance.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
}