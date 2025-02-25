const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  reactStrictMode: true,
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
};