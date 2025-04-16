import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

function RefundTracker() {
  const [status, setStatus] = useState({
    estimatedRefund: 0,
    progress: 0,
    recentActivity: [],
  });

  useEffect(() => {
    fetch("/api/get-refund-status")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((error) => console.error("Error:", error));

    // GSAP animation for progress bar
    gsap.to(".progress-bar", {
      width: `${status.progress}%`,
      duration: 1,
      ease: "power3.out",
    });
  }, [status.progress]);

  return (
    <div id="tracker" className="refund-tracker">
      <h2>Your Refund Status</h2>
      <p>Estimated Refund: <strong>${status.estimatedRefund}</strong></p>
      <p>Progress: <strong>{status.progress}% Complete</strong></p>
      <div className="progress-bar" style={{ height: "10px", background: "#ff8c00" }}></div>
      <button className="cta-btn">Track Refund</button>
      <h3>Recent Activity</h3>
      <ul>
        {status.recentActivity.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}

export default RefundTracker;