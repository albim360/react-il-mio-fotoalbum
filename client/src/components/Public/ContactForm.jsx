import React, { useState } from 'react';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logga i dati del modulo
    
    console.log('Email:', email);
    console.log('Messaggio:', message);
    // Resetta i campi del modulo dopo l'invio
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <br />
        <label>
          Messaggio:
          <textarea value={message} onChange={handleMessageChange} required />
        </label>
        <br />
        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default ContactForm;
