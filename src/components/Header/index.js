import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

function Header() {
  const navigate = useNavigate();

  const handleAddNewPost = () => {
    navigate('/new'); 
  };

  return (
    <nav className="header-navbar">
      <div className="header-navbar-brand-container">
        <Link className="header-navbar-brand" to="/">
          Blog App
        </Link>
      </div>
      <ul className="header-navbar-nav">
        <li className="header-navbar-nav-item">
          <Link className="header-nav-link" to="/">
            Posts
          </Link>
        </li>
        <li className="header-navbar-nav-item">

          <button className='create-post' onClick={handleAddNewPost}>
            Create Post
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
