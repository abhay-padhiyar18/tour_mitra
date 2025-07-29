const axios = require("axios");
const HttpError = require("../models/http-error");

// ✅ Load environment variables
require("dotenv").config();

async function getCoordsForAddress(address) {
  const url = `${process.env.GEOCODE_URL}?q=${encodeURIComponent(
    address
  )}&format=json`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "mern-stack-app/1.0", // Required by Nominatim API
      },
    });

    const data = response.data;

    if (!data || data.length === 0) {
      throw new HttpError(
        "Could not find location for the specified address.",
        422
      );
    }

    const coordinates = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };

    return coordinates;
  } catch (err) {
    console.error("Error in geocoding:", err.message);
    throw new HttpError(
      "Fetching coordinates failed, please try again later.",
      500
    );
  }
}

module.exports = getCoordsForAddress;
