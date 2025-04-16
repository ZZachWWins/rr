import React, { useEffect } from "react";
import { gsap } from "gsap";

const Testimonials = () => {
  useEffect(() => {
    const testimonials = gsap.utils.toArray(".testimonial");
    testimonials.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    });
    gsap.to(".testimonial", {
      opacity: 0.3,
      stagger: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="section glass-container text-center py-10">
      <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
      <div className="space-y-6">
        <div className="testimonial p-4 bg-white bg-opacity-10 rounded-lg">
          "Fastest refund I’ve ever gotten! Highly recommend!" - Jane D.
        </div>
        <div className="testimonial p-4 bg-white bg-opacity-10 rounded-lg">
          "Easy process, secure, and great support. 5 stars!" - John S.
        </div>
        <div className="testimonial p-4 bg-white bg-opacity-10 rounded-lg">
          "Saved me hours with the calculator tool. Awesome!" - Mike R.
        </div>
      </div>
    </section>
  );
};

export default Testimonials;