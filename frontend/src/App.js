import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import RefundTracker from "./components/RefundTracker";
import DocumentUpload from "./components/DocumentUpload";
import PricingCalculator from "./components/PricingCalculator";
import Testimonials from "./components/Testimonials";
import UserAgreement from "./components/UserAgreement";
import Login from "./components/Login";
import Register from "./components/Register";
import Generate1040 from "./components/Generate1040"; // Import the new component
import { Helmet } from "react-helmet";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Helmet>
          <title>Rapid Refund | Fast & Secure Tax Refunds Online</title>
          <meta
            name="description"
            content="Get your tax refund fast with Rapid Refund at rapid-refund.com. Secure tax filing, instant refund tracking, and expert support."
          />
          <meta
            name="keywords"
            content="rapid refund, rapid-refund, fast tax refund, secure tax filing, tax refund online"
          />
        </Helmet>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tracker" element={<RefundTracker />} />
          <Route path="/upload" element={<DocumentUpload />} />
          <Route path="/calculator" element={<PricingCalculator />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/agreement" element={<UserAgreement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/generate-1040" element={<Generate1040 />} /> {/* New route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;