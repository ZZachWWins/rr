import React, { useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

function UserAgreement() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".agreement-modal", {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="agreement-modal glass-container">
      <h2>Rapid Refunds User Agreement</h2>
      <p>
        <strong>Free to File:</strong> No upfront costs. We handle filing.
      </p>
      <p>
        <strong>Refund Handling:</strong> We retain 20% of your refund as our fee.
      </p>
      <p>
        <strong>Your Responsibility:</strong> Provide accurate tax info.
      </p>
      <p>
        <strong>Our Promise:</strong> Secure, professional filing with bank-level
        encryption.
      </p>
      <button
        className="cta-btn"
        onClick={() => navigate("/")}
      >
        I Agree & Continue
      </button>
      <button className="cta-btn secondary" onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  );
}

export default UserAgreement;