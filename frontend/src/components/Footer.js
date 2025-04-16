import React, { useEffect } from "react";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";

function Footer() {
  useEffect(() => {
    gsap.from(".footer-content", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-content",
        start: "top 90%",
      },
    });
  }, []);

  return (
    <footer className="footer glass-container text-center py-6">
      <div className="footer-content">
        <p className="text-lg text-white">
          Built by Zachary © 2025 Rapid Refunds
        </p>
        <p className="mt-2">
          <NavLink to="/contact" className="text-teal-300 hover:text-gold-500 transition-colors">
            Get in Touch with an Agent
          </NavLink>
        </p>
      </div>
    </footer>
  );
}

export default Footer;