import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, formData);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register for Rapid Refund | Start Your Tax Refund</title>
        <meta
          name="description"
          content="Register with Rapid Refund at rapid-refund.com to start your fast, secure tax refund process. Sign up now!"
        />
        <meta name="keywords" content="rapid refund register, tax refund signup, secure tax filing" />
        <link rel="canonical" href="https://rapid-refund.com/register" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': 'Rapid Refund Register',
            'description': 'Sign up for Rapid Refund tax services.',
            'url': 'https://rapid-refund.com/register',
          })}
        </script>
      </Helmet>
      <div className="glass-container text-center py-10">
        <h2 className="text-2xl font-bold mb-4 text-white">Register for Rapid Refund</h2>
        <p className="text-white mb-4">Create an account to access fast tax refunds at rapid-refund.com.</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input-field w-full"
            aria-label="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input-field w-full"
            aria-label="Password"
            required
          />
          <button type="submit" className="cta-btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <div className="loader mt-4"></div>}
        </form>
      </div>
    </>
  );
};

export default Register;