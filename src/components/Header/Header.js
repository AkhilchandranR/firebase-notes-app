import React from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';

function Header() {
  return (
    <div className="header">
      <h1>Notes</h1>
      <div className="header__profile">
        <PersonIcon/>
        <p>Profile</p>
      </div>
    </div>
  );
}

export default Header;