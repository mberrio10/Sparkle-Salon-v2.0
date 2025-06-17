const axios = require("axios");
const { refreshAccessToken } = require("./auth");

async function fetchReviews() {
  const accessToken = await refreshAccessToken(
    "https://mybusiness.googleapis.com/v4/accounts/YOUR_ACCOUNT_ID/locations/YOUR_LOCATION_ID/reviews"
  );

  try {
    const response = await axios.get();
  } catch (error) {}
}
