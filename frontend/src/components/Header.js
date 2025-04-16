import React, { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky-header">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-2 py-1">
        <h1 className="text-sm font-bold text-white drop-shadow-md">Rapid Refunds</h1>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
            <span className="sr-only">{isOpen ? "Click here to close menu" : "Click here for menu"}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
        <nav className={`nav-menu ${isOpen ? 'nav-open' : 'nav-closed'} md:nav-open`}>
          <ul className="flex flex-col md:flex-row gap-2">
            <li><a href="/" className="nav-link">Home</a></li>
            <li><a href="/upload" className="nav-link">Upload Docs</a></li>
            <li><a href="/calculator" className="nav-link">Calculator</a></li>
            <li><a href="/testimonials" className="nav-link">Testimonials</a></li>
            <li><a href="/contact" className="nav-link">Contact</a></li>
            <li><a href="/agreement" className="nav-link">Agreement</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;