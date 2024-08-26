import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Cookies from 'js-cookie'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      console.log('Login successful', res.data);
      
      
      Cookies.set('token', res.data.token, { expires: 1 / 24 });


      
      navigate('/'); 
    } catch (err) {
      console.error('Login failed', err);
      
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      <p>
        Not registered? <button type="button" onClick={() => navigate('/register')}>Register now</button>
      </p>
    </form>
  );
}

export default Login;
