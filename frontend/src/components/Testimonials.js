import React, { useEffect } from "react";
import { gsap } from "gsap";

const Testimonials = () => {
  useEffect(() => {
    const testimonials = gsap.utils.toArray(".testimonial-card");
    testimonials.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: index * 0.4,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section className="section glass-container text-center py-12" style={{ backgroundImage: `url(https://res.cloudinary.com/dbraufdni/image/upload/v1654321/istockphoto-1325860496-612x612_acblex)` }}>
      <h2 className="text-4xl font-bold mb-8 text-white drop-shadow-md">What Our Clients Say</h2>
      <div className="testimonials-overlay grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="testimonial-card p-6 bg-white bg-opacity-95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-900">
          <p className="text-lg italic">"Fastest refund I've ever gotten! Highly recommend!"</p>
          <p className="mt-4 font-semibold text-right">- Jane D.</p>
        </div>
        <div className="testimonial-card p-6 bg-white bg-opacity-95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-900">
          <p className="text-lg italic">"Easy process, secure, and great support. 5 stars!"</p>
          <p className="mt-4 font-semibold text-right">- John S.</p>
        </div>
        <div className="testimonial-card p-6 bg-white bg-opacity-95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-900">
          <p className="text-lg italic">"Saved me hours with the calculator tool. Awesome!"</p>
          <p className="mt-4 font-semibold text-right">- Mike R.</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;