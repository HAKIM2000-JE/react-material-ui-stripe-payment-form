import React from 'react';
import { NavLink } from 'react-router-dom';
import "./navbar.css"
const Navbar = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Logo />
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/purchase">Get your ID</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/about">Specials</NavLink>
            </li>
            <li>
              <NavLink to="/contact">About</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Home = () => <h2>You are in the Home</h2>;
const Blogs = () => <h2>You are in the Blogs</h2>;
const Projects = () => <h2>You are in the Projects</h2>;
const About = () => <h2>You are in the About</h2>;
const Contact = () => <h2>You are in the Contact</h2>;



const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#ffffff"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#ffffff"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#ffffff"
      />
    </g>
  </svg>
);

const Logo = () => (
    <img src='./elo.jpg' alt="Logo" style={{ width: '105px', height: 'auto' }} />
  );
  


export default Navbar;
