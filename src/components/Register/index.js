import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './index.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password, email });
      setSuccessMessage('User registered successfully!');
      setErrorMessage('');
      
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/login'); 
      }, 3000);
      
    } catch (err) {
      setErrorMessage('Registration failed: ' + (err.response?.data?.message || err.message));
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {successMessage && (
        <div className="popup success">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="popup error">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Register;
