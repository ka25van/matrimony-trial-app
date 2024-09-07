import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [place, setPlace] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate(); // Use navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        place,
        password,
        gender
      });
      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/login'); // Use navigate instead of history.push
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Place:</label>
        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
