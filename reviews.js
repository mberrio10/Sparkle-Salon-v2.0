const axios = require("axios");
const { refreshAccessToken } = require("./auth");

async function fetchReviews(accountId, locationId) {
  const reviews = [];

  try {
    const accessToken = await refreshAccessToken();
    if (!accessToken) {
      console.warn("Access token is not available. Cannot fetch reviews.");
      return reviews;
    }

    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.reviews || reviews;
  } catch (error) {
    console.error(
      "Error fetching reviews:",
      error.response?.data || error.message
    );
    return reviews;
  }
}

module.exports = { fetchReviews };
