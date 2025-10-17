import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './index.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {!user ? (
       
        <div className="navbar-guest">
          <Link to="/" className="navbar-logo">
            StoreRatings
          </Link>
          <div className="guest-links">
            <NavLink to="/login" className="nav-links">Login</NavLink>
            <NavLink to="/signup" className="nav-links">Signup</NavLink>
          </div>
        </div>
      ) : (
        
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">StoreRatings</Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <span className="nav-user">Welcome, {user.name}</span>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className="nav-links">Profile</NavLink>
            </li>
            <li className="nav-item-btn">
              <button onClick={logout} className="nav-links-button">Logout</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
