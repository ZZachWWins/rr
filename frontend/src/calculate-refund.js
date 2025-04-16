exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const { income, deductions } = JSON.parse(event.body);
  const taxableIncome = income - deductions;
  const refund = taxableIncome > 0 ? taxableIncome * 0.15 : 0; // Simple 15% refund estimate

  return {
    statusCode: 200,
    body: JSON.stringify({ refund }),
  };
};