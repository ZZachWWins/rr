import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function UserAgreement() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    console.log("Checking agreement status...");
    const hasAgreed = localStorage.getItem("agreementAccepted");
    if (hasAgreed) {
      console.log("User has already agreed, redirecting...");
      navigate("/");
      return;
    }

    console.log("Animating modal...");
    gsap.from(".agreement-modal", {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [navigate]);

  const handleAgree = () => {
    console.log("User clicked Agree, setting agreement...");
    localStorage.setItem("agreementAccepted", "true");
    setAgreed(true);
    console.log("Delaying redirect for 1 second...");
    setTimeout(() => {
      console.log("Redirecting to homepage...");
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Rapid Refund User Agreement | Terms of Service</title>
        <meta
          name="description"
          content="Read Rapid Refund’s User Agreement at rapid-refund.com. Learn about our secure tax filing, transparent fees, and your responsibilities."
        />
        <meta name="keywords" content="rapid refund agreement, tax refund terms, user agreement" />
        <link rel="canonical" href="https://rapid-refund.com/agreement" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': 'Rapid Refund User Agreement',
            'description': 'Terms of service for Rapid Refund’s tax filing services.',
            'url': 'https://rapid-refund.com/agreement',
          })}
        </script>
      </Helmet>
      <div className="agreement-modal glass-container">
        <h2>Rapid Refund User Agreement</h2>
        <p>Welcome to Rapid Refund at rapid-refund.com! Our User Agreement outlines the terms for using our fast, secure tax refund services.</p>
        <p>
          <strong>Free to File:</strong> Lowest upfront costs. We handle filing.
        </p>
        <p>
          <strong>Refund Handling:</strong> We retain 20% of your refund as our fee.
        </p>
        <p>
          <strong>Your Responsibility:</strong> Provide accurate tax info.
        </p>
        <p>
          <strong>Our Promise:</strong> Secure, professional filing with bank-level encryption.
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
    </>
  );
}

export default UserAgreement;