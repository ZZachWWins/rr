import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Header from "./components/Header";
import Contact from "./components/Contact";

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
        <Header />
        <Routes>
          <Route
            path="/contact"
            element={<Contact />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;