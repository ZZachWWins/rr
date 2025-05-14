import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

function Generate1040() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleInitial: '',
    ssn: '',
    filingStatus: 'Single',
    dependentFirstName: '',
    wages: '',
    taxWithheld: '',
    estimatedPayments: '',
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/generate-1040', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setStatus('Form generated successfully!');
        window.open(result.pdfUrl); // Download the filled PDF
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Generate 1040 Form | Rapid Refund</title>
        <meta
          name="description"
          content="Generate your IRS Form 1040 with Rapid Refund at rapid-refund.com. Input your tax details and download your filled form instantly."
        />
        <meta name="keywords" content="rapid refund 1040, generate tax form, IRS 1040 form" />
        <link rel="canonical" href="https://rapid-refund.com/generate-1040" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Rapid Refund 1040 Generator',
            'description': 'Generate your IRS Form 1040 with Rapid Refund.',
            'url': 'https://rapid-refund.com/generate-1040',
          })}
        </script>
      </Helmet>
      <div className="glass-container text-center py-10">
        <h2 className="text-2xl font-bold mb-4 text-white">Generate Your IRS Form 1040</h2>
        <p className="text-white mb-6">
          Enter your tax details below to generate a filled IRS Form 1040 with Rapid Refund at rapid-refund.com.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-white font-bold">First Name:</span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className="input-field w-full mt-2"
              aria-label="First Name"
              required
            />
          </label>
          <label className="block">
            <span className="text-white font-bold">Middle Initial:</span>
            <input
              type="text"
              name="middleInitial"
              value={formData.middleInitial}
              onChange={handleInputChange}
              placeholder="A"
              className="input-field w-full mt-2"
              aria-label="Middle Initial"
            />
          </label>
          <label className="block">
            <span className="text-white font-bold">Social Security Number (XXX-XX-XXXX):</span>
            <input
              type="text"
              name="ssn"
              value={formData.ssn}
              onChange={handleInputChange}
              placeholder="123-45-6789"
              className="input-field w-full mt-2"
              aria-label="Social Security Number"
              required
              pattern="\d{3}-\d{2}-\d{4}"
            />
          </label>
          <label className="block">
            <span className="text-white font-bold">Filing Status:</span>
            <select
              name="filingStatus"
              value={formData.filingStatus}
              onChange={handleInputChange}
              className="input-field w-full mt-2"
            >
              <option value="Single">Single</option>
              <option value="Married filing jointly">Married Filing Jointly</option>
              <option value="Married filing separately">Married Filing Separately</option>
              <option value="Head of household">Head of Household</option>
              <option value="Qualifying surviving spouse">Qualifying Surviving Spouse</option>
            </select>
          </label>
          <label className="block">
            <span className="text-white font-bold">Dependent First Name (if any):</span>
            <input
              type="text"
              name="dependentFirstName"
              value={formData.dependentFirstName}
              onChange={handleInputChange}
              placeholder="Jane"
              className="input-field w-full mt-2"
              aria-label="Dependent First Name"
            />
          </label>
          <label className="block">
            <span className="text-white font-bold">Wages, Salaries, Tips (Line 1a):</span>
            <input
              type="number"
              name="wages"
              value={formData.wages}
              onChange={handleInputChange}
              placeholder="35200"
              className="input-field w-full mt-2"
              aria-label="Wages"
              required
              min="0"
            />
          </label>
          <label className="block">
            <span className="text-white font-bold">Federal Income Tax Withheld (Line 25a):</span>
            <input
              type="number"
              name="taxWithheld"
              value={formData.taxWithheld}
              onChange={handleInputChange}
              placeholder="2000"
              className="input-field w-full mt-2"
              aria-label="Tax Withheld"
              required
              min="0"
            />
          </label>
          <label className="block">
            <span className="text-white font-bold">2024 Estimated Tax Payments (Line 26):</span>
            <input
              type="number"
              name="estimatedPayments"
              value={formData.estimatedPayments}
              onChange={handleInputChange}
              placeholder="0"
              className="input-field w-full mt-2"
              aria-label="Estimated Payments"
              min="0"
            />
          </label>
          <button type="submit" className="cta-btn" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate 1040 Form'}
          </button>
          {isLoading && <div className="loader mt-4"></div>}
        </form>
        {status && <p className="mt-4 text-white">{status}</p>}
      </div>
    </>
  );
}

export default Generate1040;