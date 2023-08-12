const otpService = require('../services/otpService');

const generateOTP = (req, res) => {
  const otp = otpService.generateOTP();
  res.json({ otp });
};

module.exports = { generateOTP };