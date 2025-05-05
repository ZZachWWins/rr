import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData);
      localStorage.setItem("token", response.data.token);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login to Rapid Refund | Secure Tax Refund Access</title>
        <meta
          name="description"
          content="Log in to Rapid Refund at rapid-refund.com to access secure tax refund services, track your refund, and upload documents."
        />
        <meta name="keywords" content="rapid refund login, tax refund login, secure tax filing" />
        <link rel="canonical" href="https://rapid-refund.com/login" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': 'Rapid Refund Login',
            'description': 'Secure login for Rapid Refund tax services.',
            'url': 'https://rapid-refund.com/login',
          })}
        </script>
      </Helmet>
      <div className="glass-container text-center py-10">
        <h2 className="text-2xl font-bold mb-4 text-white">Log In to Rapid Refund</h2>
        <p className="text-white mb-4">Access your tax refund account securely at rapid-refund.com.</p>
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
            {isLoading ? "Logging In..." : "Log In"}
          </button>
          {isLoading && <div className="loader mt-4"></div>}
        </form>
      </div>
    </>
  );
};

export default Login;