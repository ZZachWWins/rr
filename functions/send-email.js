const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const { name, email, message, to } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "therapidrefund@gmail.com", // Replace with your Gmail
      pass: "your-app-password", // Use a Gmail App Password (no spaces!)
    },
  });

  const mailOptions = {
    from: email,
    to,
    subject: `New Contact from ${name}`,
    text: `${message}\n\nSent by: ${name} <${email}>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: JSON.stringify({ message: "Message sent successfully!" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: "Error sending email" }) };
  }
};