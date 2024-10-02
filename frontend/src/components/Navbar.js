import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="images/navbar-logo.png" alt="Docere Logo" />
        </Link>
      </div>

      <div className='navbar-right'>
        <div className="navbar-search">
            <input type="text" placeholder="Search for anything..." />
        </div>

        <div className="navbar-icons">
            <Link to="/profile">
              <img src="images/profile.png" alt='Profile'/>
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
