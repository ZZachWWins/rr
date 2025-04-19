import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        ".banner",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isVisible]);

  const handleClose = () => {
    gsap.to(".banner", {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => setIsVisible(false),
    });
  };

  if (!isVisible) return null;

  return (
    <>
      <Helmet>
        <title>Rapid Refund | Fast Tax Refunds</title>
        <meta
          name="description"
          content="Get your tax refund fast with Rapid Refund at rapid-refund.com. Secure filing and instant tracking."
        />
      </Helmet>
      <div className="banner fixed top-0 left-0 w-full bg-gray-800 bg-opacity-90 backdrop-blur-md text-white p-3 text-center z-50 flex justify-between items-center">
        <span>Get Your Tax Refund Fast! Connect with Rapid Refund at rapid-refund.com.</span>
        <div>
          <NavLink to="/calculator" className="cta-btn ml-4">Calculate Refund</NavLink>
          <button
            onClick={handleClose}
            className="text-white hover:text-teal-300 focus:outline-none text-xl px-2"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default TopBanner;