import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

function PricingCalculator() {
  const [income, setIncome] = useState("");
  const [agrees, setAgrees] = useState(false);
  const [result, setResult] = useState({ refund: null, fee: null });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Calculate service fee based on income tiers
  const calculateFee = (income) => {
    const numIncome = parseFloat(income);
    if (isNaN(numIncome) || numIncome < 0) return 0;
    if (numIncome <= 100000) return 35;
    else if (numIncome <= 243000) return 75;
    else if (numIncome <= 609000) return 250;
    else return 500;
  };

  // Simplified refund calculation (fallback for API failure)
  const calculateLocalRefund = (income) => {
    const numIncome = parseFloat(income);
    if (isNaN(numIncome) || numIncome < 0) return 0;

    // 2025 Standard deduction for single filers (estimated)
    const standardDeduction = 14600;
    const taxableIncome = Math.max(0, numIncome - standardDeduction);

    // Simplified 2025 tax brackets for single filers (estimated)
    let tax = 0;
    if (taxableIncome <= 11600) tax = taxableIncome * 0.1;
    else if (taxableIncome <= 47150) tax = 1160 + (taxableIncome - 11600) * 0.12;
    else if (taxableIncome <= 100525) tax = 5426 + (taxableIncome - 47150) * 0.22;
    else if (taxableIncome <= 191950) tax = 17168.5 + (taxableIncome - 100525) * 0.24;
    else tax = 39110.5 + (taxableIncome - 191950) * 0.32;

    // Placeholder withholding (15% of income for simplicity)
    const refund = Math.max(0, tax - taxableIncome * 0.15);
    console.log(`Local Refund Calc: Income=${numIncome}, Tax=${tax}, Refund=${refund}`);
    return refund;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setResult({ refund: null, fee: null });

    if (!agrees) {
      setError("Please confirm your income is accurate.");
      setIsLoading(false);
      return;
    }
    if (!income || parseFloat(income) < 0) {
      setError("Please enter a valid annual income.");
      setIsLoading(false);
      return;
    }

    const fee = calculateFee(income);
    console.log(`Fee Calculated: ${fee} for Income=${income}`);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/calculate-refund`, {
        income: parseFloat(income),
        deductions: 0,
      });
      console.log(`API Response: Refund=${response.data.refund}`);
      setResult({ refund: response.data.refund, fee });
    } catch (error) {
      console.error("API Failed:", error);
      setError("Unable to fetch refund from server. Showing estimated calculation.");
      const localRefund = calculateLocalRefund(income);
      setResult({ refund: localRefund, fee });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Rapid Refund Calculator | Estimate Your Tax Refund</title>
        <meta
          name="description"
          content="Estimate your tax refund and fees instantly with Rapid Refund’s calculator at rapid-refund.com. Fast, secure, and transparent!"
        />
        <meta name="keywords" content="rapid refund calculator, tax refund calculator, fast tax refund, tax estimator" />
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
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Calculate Your Rapid Refund</h2>
          <p className="text-gray-600 mt-2">
            Estimate your tax refund and see Rapid Refund’s transparent fees. Enter your income to get started!
          </p>
        </section>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Annual Income ($):</span>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="45000"
              aria-label="Annual Income"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agrees}
              onChange={(e) => setAgrees(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">I confirm my income is accurate</span>
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={!agrees || !income || isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Calculating..." : "Calculate Refund"}
          </button>
        </form>
        {result.refund !== null && result.fee !== null && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold text-gray-800">Your Estimate</h3>
            <p className="text-gray-700">
              Estimated Refund: ${result.refund.toFixed(2)}
            </p>
            <p className="text-gray-700">Service Fee: ${result.fee.toFixed(2)}</p>
            <p className="text-gray-700 font-bold">
              Net Refund: ${(result.refund - result.fee).toFixed(2)}
            </p>
            {error && <p className="text-yellow-600 text-sm mt-2">Note: This is an estimated calculation due to server issues.</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default PricingCalculator;