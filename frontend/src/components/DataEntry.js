import React, { useState } from "react";

function DataEntry() {
  const [amount, setAmount] = useState("");
  const [agrees, setAgrees] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agrees) return;
    try {
      const response = await fetch("/api/save-tax-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, userId: "mock-user" }), // Replace with real user ID
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return (
    <div className="data-entry">
      <h2>Enter W-2 Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount Paid:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="45000"
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={agrees}
            onChange={(e) => setAgrees(e.target.checked)}
          />
          The amounts agree
        </label>
        <button className="cta-btn" type="submit" disabled={!agrees}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default DataEntry;