import React, { useEffect } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <title>Rapid Refund Testimonials | Client Success Stories</title>
        <meta
          name="description"
          content="See what clients say about Rapid Refund at rapid-refund.com. Fast, secure tax refunds with top-rated support. Read reviews now!"
        />
        <meta name="keywords" content="rapid refund testimonials, tax refund reviews, client stories" />
        <link rel="canonical" href="https://rapid-refund.com/testimonials" />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Review',
              'reviewBody': 'Rapid Refund got my $4,000 tax refund in just 3 days! Best service ever.',
              'author': { '@type': 'Person', 'name': 'Jane D.' },
              'itemReviewed': { '@type': 'WebApplication', 'name': 'Rapid Refund' },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Review',
              'reviewBody': 'Easy process, secure, and great support. Got my refund fast!',
              'author': { '@type': 'Person', 'name': 'John S.' },
              'itemReviewed': { '@type': 'WebApplication', 'name': 'Rapid Refund' },
            },
          ])}
        </script>
      </Helmet>
      <section className="section glass-container text-center py-12" style={{ backgroundImage: `url(https://res.cloudinary.com/dbraufdni/image/upload/v1654321/istockphoto-1325860496-612x612_acblex)` }}>
        <h2 className="text-4xl font-bold mb-8 text-white drop-shadow-md">What Our Clients Say About Rapid Refund</h2>
        <div className="testimonials-overlay grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="testimonial-card p-6 bg-white bg-opacity-95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-900">
            <p className="text-lg italic">"Rapid Refund got my $4,000 tax refund in just 3 days! Best service ever."</p>
            <p className="mt-4 font-semibold text-right">- Jane D., Texas</p>
          </div>
          <div className="testimonial-card p-6 bg-white bg-opacity-95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-900">
            <p className="text-lg italic">"Easy process, secure, and great support. Got my refund fast!"</p>
            <p className="mt-4 font-semibold text-right">- John S., California</p>
          </div>
          <div className="testimonial-card p-6 bg-white bg-opacity-95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-900">
            <p className="text-lg italic">"The calculator saved me hours. Rapid Refund is awesome!"</p>
            <p className="mt-4 font-semibold text-right">- Mike R., Florida</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;