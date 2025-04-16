import React from "react";

function Hero() {
  return (
    <div className="hero glass-container text-center py-10 md:py-16" style={{ backgroundImage: `url(https://res.cloudinary.com/dbraufdni/image/upload/v1654321/GettyImages-941729686-1170x508_uro3a8)`, marginTop: "180px" }}>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">
        Get Every Dollar You Deserve on Your Taxes, Guaranteed
      </h1>
      <p className="text-base md:text-lg text-white mb-6 md:mb-8 max-w-xs md:max-w-md mx-auto">
        We bring together seasoned experts and powerful technology to get your taxes done right.
      </p>
      <button className="cta-btn mt-4 md:mt-6">Get Started</button>
    </div>
  );
}

export default Hero;