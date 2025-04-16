import React, { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky-header glass-container py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
        <h1 className="text-xl font-bold text-white">Rapid Refunds</h1>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <nav className={`md:flex ${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-16 right-4 md:right-auto bg-gray-800 md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none w-48 md:w-auto`}>
          <ul className="flex flex-col md:flex-row gap-4">
            <li><a href="/" className="text-white hover:text-accent-gold">Home</a></li>
            <li><a href="/upload" className="text-white hover:text-accent-gold">Upload Docs</a></li>
            <li><a href="/calculator" className="text-white hover:text-accent-gold">Calculator</a></li>
            <li><a href="/testimonials" className="text-white hover:text-accent-gold">Testimonials</a></li>
            <li><a href="/contact" className="text-white hover:text-accent-gold">Contact</a></li>
            <li><a href="/agreement" className="text-white hover:text-accent-gold">Agreement</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;