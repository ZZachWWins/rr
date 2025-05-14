const { PDFDocument } = require('pdf-lib');
const axios = require('axios');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const { firstName, middleInitial, ssn, filingStatus, dependentFirstName, wages, taxWithheld, estimatedPayments } = JSON.parse(event.body);

    // Load the 1040 PDF template from IRS
    const templateUrl = 'https://www.irs.gov/pub/irs-pdf/f1040.pdf';
    const templateBytes = await axios.get(templateUrl, { responseType: 'arraybuffer' });
    const pdfDoc = await PDFDocument.load(templateBytes.data);

    // Get the form
    const form = pdfDoc.getForm();

    // Fill highlighted fields
    // Page 1
    // Name and SSN
    form.getTextField('f1_1').setText(firstName || ''); // First name
    form.getTextField('f1_2').setText(middleInitial || ''); // Middle initial
    form.getTextField('f1_3').setText(ssn || ''); // SSN

    // Filing Status
    if (filingStatus === 'Single') form.getCheckBox('c1_1').check();
    else if (filingStatus === 'Married filing jointly') form.getCheckBox('c1_2').check();
    else if (filingStatus === 'Married filing separately') form.getCheckBox('c1_3').check();
    else if (filingStatus === 'Head of household') form.getCheckBox('c1_4').check();
    else if (filingStatus === 'Qualifying surviving spouse') form.getCheckBox('c1_5').check();

    // Dependents
    if (dependentFirstName) form.getTextField('f1_4').setText(dependentFirstName);

    // Line 1a: Wages (Total income for simplicity, Line 11)
    const totalIncome = parseFloat(wages) || 0;
    form.getTextField('f1_5').setText(totalIncome.toString());

    // Line 12: Standard Deduction (20,000 as per your form for Single)
    const standardDeduction = 20000; // Adjust if filing status changes (e.g., 29,200 for Married Filing Jointly)
    form.getTextField('f1_6').setText(standardDeduction.toString());

    // Line 14: Taxable Income (Line 11 - Line 13)
    const taxableIncome = Math.max(0, totalIncome - standardDeduction);
    form.getTextField('f1_7').setText(taxableIncome.toString());

    // Page 2
    // Line 25a: Federal Tax Withheld
    const withheld = parseFloat(taxWithheld) || 0;
    form.getTextField('f2_1').setText(withheld.toString());

    // Line 26: Estimated Tax Payments
    const estimated = parseFloat(estimatedPayments) || 0;
    form.getTextField('f2_2').setText(estimated.toString());

    // Line 33: Total Payments (sum of 25a, 26, and any other credits; assume no other credits for now)
    const totalPayments = withheld + estimated;
    form.getTextField('f2_3').setText(totalPayments.toString());

    // Line 34: Amount Overpaid (simplified, assuming tax = 0 for now)
    // Line 37: Amount Owed (if tax > total payments)
    // For simplicity, assume tax is 0, so total payments = overpayment
    form.getTextField('f2_4').setText(totalPayments.toString()); // Line 34: Overpaid
    form.getTextField('f2_5').setText('0'); // Line 37: Owed

    // Save the filled PDF
    const pdfBytes = await pdfDoc.save();

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append('file', Buffer.from(pdfBytes).toString('base64'));
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
      formData
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ pdfUrl: cloudinaryResponse.data.secure_url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};