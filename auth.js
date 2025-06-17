const axios = require("axios");
require("dotenv").config();

async function refreshAccessToken() {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    });

    const newAccessToken = response.data.access_token;
    return newAccessToken;
  } catch (e) {
    console.error("Error refreshing access token:", e.response.data);
  }
}

module.exports = { refreshAccessToken };
