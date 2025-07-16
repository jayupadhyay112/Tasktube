import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // for redirecting after login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (res.data.status === 'ok') {
        alert('Login successful');
        // Optionally save token to localStorage
        localStorage.setItem('token', res.data.token);
        console.log(res.data);
        
        localStorage.setItem('name', res.data.userName);
        navigate('/Home');
        window.location.reload();
      } else {
        alert(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login failed', err);
      alert('Server error');
    }
    
  };

  return (
    <div id="log" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'auto',
      margin: '7%'
    }}>
      <div id="left" style={{
        width: '40vmin',
        height: '21vmin',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '110px',
        textAlign: 'center',
        color: 'white',
        gap: '30px',
        margin: '0'
      }}>
        <h2 style={{ fontSize: '36px' }}>Welcome Back</h2>
        <p style={{ fontSize: '18px', background: 'none' }}>
          Please log in using your personal information to stay connected with us.
        </p>
      </div>

      <div id="right" style={{
        width: '40vmin',
        height: '20vmin',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '110px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ background: 'none', marginBottom: '4vmin' }}>Login Form</h1>

        <form onSubmit={handleLogin} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          background: 'none'
        }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ margin: '10px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ margin: '10px' }}
          />
          <button type="submit"  style={{
            margin: '10px',
            borderRadius: '40px',
            border: 'none',
            background: '#fff'
          }}>Login
          </button>

          <p style={{ background: 'none' }}>
            Don't have an account?{" "}
            <Link to="/Signup" style={{
              background: 'none',
              color: '#fff',
              textDecoration: 'none'
            }}>
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
