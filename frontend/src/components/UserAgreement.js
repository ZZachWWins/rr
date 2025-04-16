import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

function UserAgreement() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    gsap.from(".agreement-modal", {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  const handleAgree = () => {
    setAgreed(true);
    // Delay navigation to ensure user sees confirmation
    setTimeout(() => navigate("/"), 1000);
  };

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
      {!agreed ? (
        <>
          <button className="cta-btn" onClick={handleAgree}>
            I Agree & Continue
          </button>
          <button className="cta-btn secondary" onClick={() => navigate("/")}>
            Cancel
          </button>
        </>
      ) : (
        <p className="text-center mt-4 text-green-500">Agreement accepted! Redirecting...</p>
      )}
    </div>
  );
}

export default UserAgreement;