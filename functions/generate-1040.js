const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
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

    // Embed a font for text placement
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 10;
    const textColor = rgb(0, 0, 0); // Black text

    // Get pages
    const page1 = pdfDoc.getPage(0); // Page 1
    const page2 = pdfDoc.getPage(1); // Page 2

    // Page 1: Fill highlighted fields using coordinates
    // First Name (top left, approx x: 50, y: 720)
    page1.drawText(firstName || '', { x: 50, y: 720, size: fontSize, font, color: textColor });

    // Middle Initial (next to First Name, approx x: 220, y: 720)
    page1.drawText(middleInitial || '', { x: 220, y: 720, size: fontSize, font, color: textColor });

    // SSN (top right, approx x: 450, y: 720)
    page1.drawText(ssn || '', { x: 450, y: 720, size: fontSize, font, color: textColor });

    // Filing Status (Single checkbox, approx x: 50, y: 680)
    if (filingStatus === 'Single') {
      page1.drawText('X', { x: 50, y: 680, size: fontSize, font, color: textColor });
    } else if (filingStatus === 'Married filing jointly') {
      page1.drawText('X', { x: 120, y: 680, size: fontSize, font, color: textColor });
    } else if (filingStatus === 'Married filing separately') {
      page1.drawText('X', { x: 220, y: 680, size: fontSize, font, color: textColor });
    } else if (filingStatus === 'Head of household') {
      page1.drawText('X', { x: 320, y: 680, size: fontSize, font, color: textColor });
    } else if (filingStatus === 'Qualifying surviving spouse') {
      page1.drawText('X', { x: 420, y: 680, size: fontSize, font, color: textColor });
    }

    // Dependents (First name column, approx x: 50, y: 620)
    if (dependentFirstName) {
      page1.drawText(dependentFirstName, { x: 50, y: 620, size: fontSize, font, color: textColor });
    }

    // Line 1a: Wages (approx x: 500, y: 580)
    const totalIncome = parseFloat(wages) || 0;
    page1.drawText(totalIncome.toString(), { x: 500, y: 580, size: fontSize, font, color: textColor });

    // Line 12: Standard Deduction (20,000 as per your form for Single, approx x: 500, y: 460)
    const standardDeduction = 20000; // Adjust if filing status changes
    page1.drawText(standardDeduction.toString(), { x: 500, y: 460, size: fontSize, font, color: textColor });

    // Line 14: Taxable Income (Line 11 - Line 13, approx x: 500, y: 440)
    const taxableIncome = Math.max(0, totalIncome - standardDeduction);
    page1.drawText(taxableIncome.toString(), { x: 500, y: 440, size: fontSize, font, color: textColor });

    // Page 2: Fill highlighted fields
    // Line 25a: Federal Tax Withheld (approx x: 500, y: 620)
    const withheld = parseFloat(taxWithheld) || 0;
    page2.drawText(withheld.toString(), { x: 500, y: 620, size: fontSize, font, color: textColor });

    // Line 26: Estimated Tax Payments (approx x: 500, y: 610)
    const estimated = parseFloat(estimatedPayments) || 0;
    page2.drawText(estimated.toString(), { x: 500, y: 610, size: fontSize, font, color: textColor });

    // Line 33: Total Payments (sum of 25a, 26, approx x: 500, y: 550)
    const totalPayments = withheld + estimated;
    page2.drawText(totalPayments.toString(), { x: 500, y: 550, size: fontSize, font, color: textColor });

    // Line 34: Amount Overpaid (simplified, assuming tax = 0, approx x: 500, y: 540)
    page2.drawText(totalPayments.toString(), { x: 500, y: 540, size: fontSize, font, color: textColor });

    // Line 37: Amount Owed (assume 0, approx x: 500, y: 510)
    page2.drawText('0', { x: 500, y: 510, size: fontSize, font, color: textColor });

    // Save the filled PDF
    const pdfBytes = await pdfDoc.save();

    // Upload to Cloudinary with proper base64 formatting
    const base64String = Buffer.from(pdfBytes).toString('base64');
    const dataUri = `data:application/pdf;base64,${base64String}`; // Add data URI scheme

    const formData = new FormData();
    formData.append('file', dataUri); // Use the data URI format
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