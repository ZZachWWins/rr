exports.handler = async (event) => {
  try {
    const { amount, userId } = JSON.parse(event.body);
    // In production, save to a database (e.g., Firebase)
    console.log("Saved tax data:", { amount, userId });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data saved", amount }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save data" }),
    };
  }
};