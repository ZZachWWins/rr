import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

function RefundTracker() {
  const [status, setStatus] = useState({
    estimatedRefund: 0,
    progress: 0,
    recentActivity: [],
  });

  useEffect(() => {
    // Mock data for now
    setStatus({
      estimatedRefund: 5000,
      progress: 75,
      recentActivity: ["Document uploaded", "Processing started"],
    });
    gsap.to(".progress-bar", {
      width: `${status.progress}%`,
      duration: 1,
      ease: "power3.out",
    });
  }, [status.progress]);

  return (
    <div className="refund-tracker glass-container text-center py-10" style={{ backgroundImage: `url(https://res.cloudinary.com/dbraufdni/image/upload/v1654321/tax_ydpvsx)` }}>
      <h2 className="text-2xl font-bold mb-4 text-white">Your Refund Status</h2>
      <p className="text-white">Estimated Refund: <strong>${status.estimatedRefund}</strong></p>
      <p className="text-white">Progress: <strong>{status.progress}% Complete</strong></p>
      <div className="progress-bar bg-orange-500 h-2 w-full mt-2 rounded"></div>
      <button className="cta-btn mt-4 bg-blue-600 text-white">Track Refund</button>
      <h3 className="text-xl font-bold mt-6 text-white">Recent Activity</h3>
      <ul className="text-white">
        {status.recentActivity.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}

export default RefundTracker;