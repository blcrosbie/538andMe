
// src/components/common/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/bills', label: 'Bills & Votes' },
    { path: '/representatives', label: 'Representatives' },
    { path: '/analysis', label: 'Analysis' },
    { path: '/elections', label: 'Elections' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          538and<span className="highlight">Me</span>.io
        </Link>
        <nav className="nav-links">
          {navItems.map(item => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="user-section">
          <div className="search-box">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search representatives..." 
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
