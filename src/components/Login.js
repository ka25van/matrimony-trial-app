import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      
      if (response.status === 200) {
        alert('Login successful');
        navigate('/home'); // Redirect to home page on success
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Invalid email or password. Redirecting to registration...', err);
        setTimeout(() => {
          navigate('/register'); // Redirect to registration page on failure
        }, 1000); // Delay to show error message
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
