import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { useAdmin } from "../Context/Admin";

export default function Navbar() {
  const { login, logout, isLogin } = useAdmin();
  const navigate = useNavigate();

  // Function to handle scrolling to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Adding click event listeners to NavLinks to trigger scrollToTop
  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-ul a");

    navLinks.forEach(link => {
      link.addEventListener("click", scrollToTop);
    });

    // Cleanup event listeners on component unmount
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener("click", scrollToTop);
      });
    };
  }, []);

  const logoutUser = () => {
    logout();
    navigate("/signup");
  }

  return (
    <div id="myNavBar" style={{ position: "fixed" }}>
      {isLogin ? (
        <ul className="nav-ul">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Men</NavLink>
          </li>
          <li>
            <NavLink to="/womens" className={({ isActive }) => (isActive ? 'active' : '')}>Women</NavLink>
          </li>
          <li>
            <NavLink to="/kids" className={({ isActive }) => (isActive ? 'active' : '')}>Kids</NavLink>
          </li>
          <li>
            <NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : '')}>Add Products</NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={logoutUser} style={{ color: "#ff3535" }}>Logout</NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>Sign Up</NavLink>
          </li>
          <li className="login">
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}
