import React, { useEffect } from "react";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Rapid Refund',
            'url': 'https://rapid-refund.com',
            'contactPoint': {
              '@type': 'ContactPoint',
              'telephone': '1-800-REFUND',
              'email': 'support@rapidrefunds.com',
              'contactType': 'Customer Service',
            },
          })}
        </script>
      </Helmet>
      <footer className="footer glass-container text-center py-6">
        <div className="footer-content">
          <p className="text-lg text-white">
            Built by Zachary © 2025 Rapid Refund
          </p>
          <div className="footer-links mt-2">
            <NavLink to="/contact" className="text-teal-300 hover:text-gold-500 mx-2">
              Contact
            </NavLink>
            <NavLink to="/calculator" className="text-teal-300 hover:text-gold-500 mx-2">
              Calculator
            </NavLink>
            <NavLink to="/generate-1040" className="text-teal-300 hover:text-gold-500 mx-2">
              Generate 1040
            </NavLink>
            <NavLink to="/upload" className="text-teal-300 hover:text-gold-500 mx-2">
              Upload Docs
            </NavLink>
            <NavLink to="/tracker" className="text-teal-300 hover:text-gold-500 mx-2">
              Tracker
            </NavLink>
          </div>
          <p className="mt-2">
            Contact Rapid Refund | 1-800-REFUND | support@rapidrefunds.com
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;