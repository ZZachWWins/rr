import React, { useState } from "react";
import { Helmet } from "react-helmet";

function PricingCalculator() {
  const [income, setIncome] = useState("");
  const [agrees, setAgrees] = useState(false);
  const [result, setResult] = useState({ refund: 0, fee: 0 });

  const calculateFee = (income) => {
    const numIncome = parseFloat(income);
    if (numIncome <= 100000) {
      return 35; // $35 for ≤$100k
    } else if (numIncome <= 243000) {
      return 75; // $75 for $100k-$243k
    } else if (numIncome <= 609000) {
      return 250; // $250 for $243k-$609k
    } else {
      return 500; // $500 for >$609k
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agrees || !income) return;
    const fee = calculateFee(income);
    try {
      const response = await fetch("/api/RefundCalculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ income: parseFloat(income), deductions: 0 }),
      });
      const data = await response.json();
      setResult({ refund: data.refund, fee });
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Rapid Refund Calculator | Estimate Your Tax Refund</title>
        <meta
          name="description"
          content="Use Rapid Refund’s Pricing & Refund Calculator to estimate your tax refund and fees instantly at rapid-refund.com. Fast, secure, and accurate!"
        />
        <meta name="keywords" content="rapid refund calculator, tax refund calculator, fast tax refund" />
        <link rel="canonical" href="https://rapid-refund.com/calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Rapid Refund Calculator',
            'description': 'Estimate your tax refund instantly with Rapid Refund’s calculator.',
            'url': 'https://rapid-refund.com/calculator',
          })}
        </script>
      </Helmet>
      <div className="data-entry">
        <section className="calculator-intro">
          <h2>Calculate Your Rapid Refund</h2>
          <p>Estimate your tax refund and see Rapid Refund’s transparent fees at rapid-refund.com. Enter your income to get started!</p>
        </section>
        <form onSubmit={handleSubmit}>
          <label>
            Annual Income:
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="45000"
              aria-label="Annual Income"
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={agrees}
              onChange={(e) => setAgrees(e.target.checked)}
            />
            I confirm my income is accurate
          </label>
          <button className="cta-btn" type="submit" disabled={!agrees || !income}>
            Calculate
          </button>
        </form>
        {result.refund > 0 && (
          <div className="mt-4">
            <p>Estimated Refund: ${result.refund.toFixed(2)}</p>
            <p>Your Fee: ${result.fee.toFixed(2)}</p>
            <p>Net Refund: ${(result.refund - result.fee).toFixed(2)}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default PricingCalculator;