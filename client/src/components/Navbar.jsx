import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = token ? JSON.parse(atob(token.split('.')[1])).username : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">

        {
          token ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/employee-list" className="nav-link">Employee List</Link>
              <Link to="/create-employee" className="nav-link">Create Employee</Link>
            </>) : null
        }

      </div>

      <div className="navbar-right">
        {token ? (
          <span className="user-info">
            {username} - <button className="logout-button" onClick={handleLogout}>Logout</button>
          </span>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};
