import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission (replace with API call in production)
    setSubmitted(true);
    setTimeout(() => {
      setStep(1);
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Rapid Refund | Fast Tax Refund Support</title>
        <meta
          name="description"
          content="Get in touch with Rapid Refund for fast, secure tax refund support. Submit your query at rapid-refund.com and connect with our team today!"
        />
        <meta name="keywords" content="rapid refund contact, tax refund support, fast refund help" />
        <link rel="canonical" href="https://rapid-refund.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Rapid Refund',
            'url': 'https://rapid-refund.com',
            'contactPoint': {
              '@type': 'ContactPoint',
              'telephone': '1-800-REFUND',
              'email': 'support@rapidrefunds.com',
              'contactType': 'Customer Service',
            },
          })}
        </script>
      </Helmet>
      <div className="contact-container">
        <header className="contact-header glass-container">
          <h1>Contact Rapid Refund for Expert Support</h1>
          <p>Need help with your tax refund? The Rapid Refund team at rapid-refund.com is here to assist with fast, secure support.</p>
        </header>
        <nav className="progress-nav">
          <ul>
            <li className={step >= 1 ? "active" : ""}>Step 1: Your Info</li>
            <li className={step >= 2 ? "active" : ""}>Step 2: Your Message</li>
            <li className={step >= 3 ? "active" : ""}>Step 3: Review & Send</li>
          </ul>
        </nav>
        {!submitted ? (
          <div className="form-wrapper glass-container">
            {step === 1 && (
              <div className="step">
                <h2>Step 1: Tell Us About You</h2>
                <p>Start with your name and email so we can assist you.</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="input-field"
                  aria-label="Your Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="input-field"
                  aria-label="Your Email"
                />
                <button
                  onClick={() => setStep(2)}
                  className="cta-btn"
                  disabled={!formData.name || !formData.email}
                >
                  Next
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="step">
                <h2>Step 2: Share Your Message</h2>
                <p>What do you need help with? Let us know!</p>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="input-field"
                  aria-label="Your Message"
                />
                <div className="nav-buttons">
                  <button onClick={() => setStep(1)} className="cta-btn secondary">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="cta-btn"
                    disabled={!formData.message}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="step">
                <h2>Step 3: Review & Send</h2>
                <p>Check your details and send when ready!</p>
                <div className="review">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Message:</strong> {formData.message}</p>
                </div>
                <div className="nav-buttons">
                  <button onClick={() => setStep(2)} className="cta-btn secondary">
                    Back
                  </button>
                  <button onClick={handleSubmit} className="cta-btn">
                    Send Message
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="confirmation glass-container">
            <h2>Thanks for Reaching Out!</h2>
            <p>We’ve got your message and will reply soon. Back to the homepage?</p>
            <NavLink to="/" className="cta-btn">
              Back to Home
            </NavLink>
          </div>
        )}
        <footer className="contact-footer glass-container">
          <p>Contact Rapid Refund | 1-800-REFUND | support@rapidrefunds.com</p>
        </footer>
      </div>
    </>
  );
};

export default Contact;