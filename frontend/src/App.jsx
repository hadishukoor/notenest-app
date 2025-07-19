import React, { useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Notes from './pages/Notes';
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate('/notes');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="App">
      <AnimatedBackground />
      <nav className="navbar">
        <div className="navbar-brand">NoteNest</div>
        <div className="nav-links">
          {!token ? (
            <>
              <Link to="/signup" className="nav-link">Sign Up</Link>
              <Link to="/login" className="nav-link">Log In</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          )}
        </div>
      </nav>

      <main>
        <h1 className="page-heading">Your thoughts, organized.</h1>
        <p className="page-subheading">A simple place for your notes and ideas.</p>
        <Routes>
          <Route
            path="/login"
            element={!token ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/notes" />}
          />
          <Route
            path="/signup"
            element={!token ? <Signup /> : <Navigate to="/notes" />}
          />
          <Route
            path="/notes"
            element={token ? <Notes /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/notes" : "/login"} />}
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;