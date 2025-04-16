import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="sticky-header glass-container">
      <div className="logo text-2xl font-bold text-white">Rapid Refunds</div>
      <nav className="nav-menu">
        <ul className="flex space-x-6">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink></li>
          <li><NavLink to="/upload" className={({ isActive }) => isActive ? "active-link" : ""}>Upload Docs</NavLink></li>
          <li><NavLink to="/calculator" className={({ isActive }) => isActive ? "active-link" : ""}>Calculator</NavLink></li>
          <li><NavLink to="/testimonials" className={({ isActive }) => isActive ? "active-link" : ""}>Testimonials</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink></li>
          <li><NavLink to="/agreement" className={({ isActive }) => isActive ? "active-link" : ""}>Agreement</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;