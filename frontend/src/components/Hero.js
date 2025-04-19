import React from "react";
import { Helmet } from "react-helmet";

function Hero() {
  return (
    <>
      <Helmet>
        <title>Rapid Refund | Fast & Secure Tax Refunds</title>
        <meta
          name="description"
          content="Get your tax refund fast with Rapid Refund at rapid-refund.com. Secure tax filing, instant refund tracking, and expert support. Start now!"
        />
        <meta name="keywords" content="rapid refund, fast tax refund, secure tax filing" />
        <link rel="canonical" href="https://rapid-refund.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Rapid Refund',
            'description': 'Fast and secure tax refund filing at rapid-refund.com.',
            'url': 'https://rapid-refund.com/',
          })}
        </script>
      </Helmet>
      <div className="hero glass-container text-center py-10 md:py-16" style={{ backgroundImage: `url(https://res.cloudinary.com/dbraufdni/image/upload/v1654321/GettyImages-941729686-1170x508_uro3a8)`, marginTop: "111px" }}>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">
          Rapid Refund: Fast Tax Refunds Guaranteed
        </h1>
        <p className="text-base md:text-lg text-white mb-6 md:mb-8 max-w-xs md:max-w-md mx-auto">
          Rapid Refund combines expert tax professionals and powerful technology to deliver your tax refund quickly and securely at rapid-refund.com.
        </p>
        <button className="cta-btn mt-4 md:mt-6">Get Started</button>
      </div>
    </>
  );
}

export default Hero;