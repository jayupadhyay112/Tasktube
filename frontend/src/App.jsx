import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Home from './component/Home';
import Ytube from './component/Ytube';
import Navbar from './component/Navbar';
import MainPage from './component/MainPage';
import Signup from './component/signup';
import Login from './component/Login';
import ChatAI from './component/ChatAI';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<MainPage />} />
          {/* Protected Routes */}
          <Route
            path="/Home"
            element={token ? <Home /> : <Navigate to="/Login" />}
          />
          <Route
            path="/Ytube"
            element={token ? <Ytube /> : <Navigate to="/Login" />}
          />
          <Route
            path="/ChatAI"
            element={token ? <ChatAI /> : <Navigate to="/Login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
