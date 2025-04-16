import React, { useEffect } from "react";
import { gsap } from "gsap";

function Hero() {
  useEffect(() => {
    gsap.from(".hero-content", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="hero starry-background">
      <div className="hero-content glass-container">
        <h1>Record Refunds in Record Time</h1>
        <p>No Upfront Fees. You Keep 80%. We Get 20%.</p>
        <button className="cta-btn">Sign Up Now</button>
        <p>#RecordRefundsRecordTime</p>
      </div>
    </div>
  );
}

export default Hero;