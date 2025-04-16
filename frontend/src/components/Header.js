import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky-header glass-container">
      <div className="logo">Rapid Refunds</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/#tracker">Track Refund</Link>
        <Link to="/#upload">Upload Docs</Link>
        <Link to="/agreement">User Agreement</Link>
      </nav>
    </header>
  );
}

export default Header;