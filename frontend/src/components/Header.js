import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    if (isBannerVisible) {
      gsap.fromTo(
        ".banner-section",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isBannerVisible]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleCloseBanner = () => {
    const banner = document.querySelector(".banner-section");
    if (banner) {
      gsap.to(banner, {
        opacity: 0,
        height: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => setIsBannerVisible(false),
      });
    } else {
      setIsBannerVisible(false);
    }
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          onError={() => console.error("Failed to load Font Awesome")}
        />
      </Helmet>
      <header className="sticky-header">
        {isBannerVisible && (
          <div className="banner-section">
            <span>Get Your Tax Refund Fast! Connect with Rapid Refund at rapid-refund.com.</span>
            <div className="banner-actions">
              <NavLink to="/calculator" className="cta-btn">Calculate Refund</NavLink>
              <button
                onClick={handleCloseBanner}
                className="close-btn"
                aria-label="Close banner"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
        <div className="header-content flex justify-between items-center max-w-6xl mx-auto px-4 py-2">
          <h1 className="text-lg font-bold text-white drop-shadow-md">Rapid Refund</h1>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="menu-btn"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
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