import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      onLoginSuccess(data.token);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login to NoteNest</h2>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input type="email" id="login-email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;