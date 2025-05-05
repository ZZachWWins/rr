import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SiteNavigationElement',
            'name': ['Home', 'Upload Docs', 'Calculator', 'Testimonials', 'Contact', 'Agreement', 'Tracker', 'Login', 'Register'],
            'url': [
              'https://rapid-refund.com/',
              'https://rapid-refund.com/upload',
              'https://rapid-refund.com/calculator',
              'https://rapid-refund.com/testimonials',
              'https://rapid-refund.com/contact',
              'https://rapid-refund.com/agreement',
              'https://rapid-refund.com/tracker',
              'https://rapid-refund.com/login',
              'https://rapid-refund.com/register',
            ],
          })}
        </script>
      </Helmet>
      <header className="sticky-header">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-2 py-1">
          <h1 className="text-sm font-bold text-white drop-shadow-md">Rapid Refund</h1>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
              <span className="sr-only">{isOpen ? "Click here to close menu" : "Click here for menu"}</span>
              <svg className="w-.5 h-.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
          <nav className={`nav-menu ${isOpen ? 'nav-open' : 'nav-closed'} md:nav-open`}>
            <ul className="flex flex-col md:flex-row gap-2">
              <li><NavLink to="/" className="nav-link">Home</NavLink></li>
              <li><NavLink to="/upload" className="nav-link">Upload Docs</NavLink></li>
              <li><NavLink to="/calculator" className="nav-link">Calculator</NavLink></li>
              <li><NavLink to="/testimonials" className="nav-link">Testimonials</NavLink></li>
              <li><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
              <li><NavLink to="/agreement" className="nav-link">Agreement</NavLink></li>
              <li><NavLink to="/tracker" className="nav-link">Tracker</NavLink></li>
              {isAuthenticated ? (
                <li>
                  <button onClick={handleLogout} className="nav-link">
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
                  <li><NavLink to="/register" className="nav-link">Register</NavLink></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;