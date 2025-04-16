import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Contact = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission (replace with actual API call in production)
    setSubmitted(true);
    setTimeout(() => {
      setStep(1);
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-container">
      <header className="contact-header glass-container">
        <h1>Get in Touch with [Friend's Name]</h1>
        <p>We’re here to help you connect—let’s make it easy!</p>
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
              <p>Start by sharing your name and email so we know who’s reaching out.</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="input-field"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="input-field"
              />
              <button
                onClick={() => setStep(2)}
                className="next-btn"
                disabled={!formData.name || !formData.email}
              >
                Next
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="step">
              <h2>Step 2: Share Your Message</h2>
              <p>What would you like to say? We’ll guide you through it!</p>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                className="input-field"
              />
              <div className="nav-buttons">
                <button onClick={() => setStep(1)} className="back-btn">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="next-btn"
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
              <p>Double-check your details and hit send when you’re ready!</p>
              <div className="review">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Message:</strong> {formData.message}</p>
              </div>
              <div className="nav-buttons">
                <button onClick={() => setStep(2)} className="back-btn">
                  Back
                </button>
                <button onClick={handleSubmit} className="send-btn">
                  Send Message
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="confirmation glass-container">
          <h2>Thanks for Reaching Out!</h2>
          <p>We’ve received your message and will get back to you soon. Want to explore more?</p>
          <NavLink to="/" className="home-link">
            Back to Home
          </NavLink>
        </div>
      )}
      <footer className="contact-footer glass-container">
        <p>Contact [Rapid Refund] | [Number for RR] | [RR Email]</p>
      </footer>
    </div>
  );
};

export default Contact;