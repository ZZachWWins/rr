import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

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
    <div className="banner fixed top-0 left-0 w-full bg-gray-800 bg-opacity-90 backdrop-blur-md text-white p-3 text-center z-50 flex justify-between items-center">
      <span>Still need to get your taxes done? Connect with our professionals today.</span>
      <button
        onClick={handleClose}
        className="text-white hover:text-teal-300 focus:outline-none text-xl px-2"
      >
        ✕
      </button>
    </div>
  );
};

export default TopBanner;