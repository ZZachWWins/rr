import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div style={{ padding: "20px" }}>Main Content Placeholder</div>
      </div>
    </Router>
  );
}

export default App;