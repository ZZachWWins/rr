import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RefundTracker from "./components/RefundTracker";
import DocumentUpload from "./components/DocumentUpload";
import RefundCalculator from "./components/RefundCalculator";
import UserAgreement from "./components/UserAgreement";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import TopBanner from "./components/TopBanner";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  React.useEffect(() => {
    gsap.utils.toArray(".section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <TopBanner />
        <Header />
        <nav className="sticky-header bg-gray-800 p-4 shadow-lg">
          <ul className="flex space-x-6 justify-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-white hover:text-teal-300 ${isActive ? "text-teal-300 font-bold" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `text-white hover:text-teal-300 ${isActive ? "text-teal-300 font-bold" : ""}`
                }
              >
                Upload Docs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/calculator"
                className={({ isActive }) =>
                  `text-white hover:text-teal-300 ${isActive ? "text-teal-300 font-bold" : ""}`
                }
              >
                Calculator
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/testimonials"
                className={({ isActive }) =>
                  `text-white hover:text-teal-300 ${isActive ? "text-teal-300 font-bold" : ""}`
                }
              >
                Testimonials
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-white hover:text-teal-300 ${isActive ? "text-teal-300 font-bold" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/agreement"
                className={({ isActive }) =>
                  `text-white hover:text-teal-300 ${isActive ? "text-teal-300 font-bold" : ""}`
                }
              >
                Agreement
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Hero />
                <section className="section glass-container">
                  <RefundTracker />
                </section>
                <section className="section glass-container">
                  <DocumentUpload />
                </section>
                <section className="section glass-container">
                  <RefundCalculator />
                </section>
                <section className="section glass-container">
                  <Testimonials />
                </section>
              </div>
            }
          />
          <Route
            path="/upload"
            element={
              <section className="section glass-container">
                <DocumentUpload />
              </section>
            }
          />
          <Route
            path="/calculator"
            element={
              <section className="section glass-container">
                <RefundCalculator />
              </section>
            }
          />
          <Route
            path="/testimonials"
            element={
              <section className="section glass-container">
                <Testimonials />
              </section>
            }
          />
          <Route
            path="/contact"
            element={
              <section className="section glass-container">
                <Contact />
              </section>
            }
          />
          <Route
            path="/agreement"
            element={<UserAgreement />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;