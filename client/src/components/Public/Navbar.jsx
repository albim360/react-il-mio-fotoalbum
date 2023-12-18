import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth(); // Usa il contesto di autenticazione

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/photos">Photos</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
