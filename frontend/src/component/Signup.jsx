import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // React state for inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');

  const handleSignup = async (e) => {
    e.preventDefault(); // prevent form reload

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name: firstName + ' ' + lastName,
        email,
        password
      });
      if (res.data.status === 'ok') {
        alert('Signup successful!');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', res.data.userName);
        navigate('/Home'); 
        window.location.reload();
      } else {
        alert(res.data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };


  return (
    <div id="log" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'auto',
      marginTop: '10vmin'
    }}>
      <div id="left" style={{
        width: '40vmin',
        height: '30vmin',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '110px',
        textAlign: 'center',
        color: 'white',
        gap: '30px'
      }}>
        <h2 style={{ fontSize: '36px' }}>Welcome</h2>
        <p style={{ fontSize: '18px', background: 'none' }}>
          Please create your account. Your journey starts here!
        </p>
      </div>

      <div id="right" style={{
        width: '40vmin',
        height: '30vmin',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '110px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ background: 'none', marginBottom: '4vmin' }}>Sign Up Form</h1>

        <form onSubmit={handleSignup} style={{ gap: '3px', background: 'none', display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ margin: '10px' }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ margin: '10px' }}
          />
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

          <button type="submit" style={{
            margin: '10px',
            borderRadius: '40px',
            border: 'none',
            background: '#fff'
          }}>Sign Up </button>

          <p style={{ background: 'none' }}>
            Already a member?{" "}
            <Link to="/Login" style={{ background: 'none', color: '#fff', textDecoration: 'none' }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
