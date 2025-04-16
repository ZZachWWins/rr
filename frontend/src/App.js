import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Test Content</h1>
        <p>This should show if rendering works</p>
      </div>
    </Router>
  );
}

export default App;