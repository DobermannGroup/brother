import React, { useState } from 'react';
import './App.css';

const AuthScreen = ({ isSignUp, toggleMode, onAuthenticate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAuthenticate(email, password, isSignUp);
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button className="toggle-auth-mode" onClick={toggleMode}>
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default AuthScreen;
