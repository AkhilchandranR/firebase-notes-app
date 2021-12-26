import React from 'react';
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from "../../useContext";
import { Link } from 'react-router-dom';

function Header() {
  const { currentUser } = useAuth();
  return (
    <div className="header">
      <Link to="/">
         <h1>Notes</h1>
      </Link>
      <div className="header__profile">
        <PersonIcon/>
        <p>
          <Link to='/user'>{currentUser.email}</Link>
        </p>
      </div>
    </div>
  );
}

export default Header;