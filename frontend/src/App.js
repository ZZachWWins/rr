import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RefundTracker from "./components/RefundTracker";
import DocumentUpload from "./components/DocumentUpload";
import DataEntry from "./components/DataEntry";
import UserAgreement from "./components/UserAgreement";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
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
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <section className="section glass-container">
                  <RefundTracker />
                </section>
                <section className="section glass-container">
                  <DocumentUpload />
                </section>
                <section className="section glass-container">
                  <DataEntry />
                </section>
              </>
            }
          />
          <Route path="/agreement" element={<UserAgreement />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;