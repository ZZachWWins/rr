exports.handler = async () => {
  try {
    const status = {
      estimatedRefund: 3200,
      progress: 60,
      recentActivity: [
        "IRS submission confirmed: March 25",
        "W-2 uploaded: March 24",
        "Identity verified: March 23",
      ],
    };
    return {
      statusCode: 200,
      body: JSON.stringify(status),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch status" }),
    };
  }
};