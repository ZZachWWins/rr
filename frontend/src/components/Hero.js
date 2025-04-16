import React from "react";

function Hero() {
  return (
    <div className="hero glass-container text-center py-10" style={{ backgroundImage: `url(https://res.cloudinary.com/dbraufdni/image/upload/v1654321/GettyImages-941729686-1170x508_uro3a8)` }}>
      <h1 className="text-4xl font-bold text-white">Get Every Dollar You Deserve on Your Taxes, Guaranteed</h1>
      <p className="mt-4 text-white">We bring together seasoned experts and powerful technology to get your taxes done right.</p>
      <button className="cta-btn mt-6 bg-blue-600 text-white">Get Started</button>
      <div className="expert-bubble mt-6">
        <p className="text-sm text-green-500">Zachary, Tax Expert, 10 yrs</p>
        <p className="text-sm text-green-500">Great refund! $5,000+</p>
      </div>
    </div>
  );
}

export default Hero;