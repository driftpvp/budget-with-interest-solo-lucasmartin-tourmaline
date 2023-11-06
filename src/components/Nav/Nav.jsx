import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title"></h2>
      </Link>
      <div>
      <Footer />
      </div>
      <div>
        
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            
            <Link className="navLink" to="/user">
              Calculator
            </Link>

            <Link className="navLink" to="/assets">
              Assets
            </Link>

            <Link className="navLink" to="/liabilities">
              Liabilities
            </Link>

            <Link className="navLink" to="/favorites">
              Favorites
            </Link>

            <Link className="navLink" to="/info">
              User's Guide
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
