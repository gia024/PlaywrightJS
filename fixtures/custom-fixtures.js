// custom-fixtures.js

function generateTenDigitPhoneNumber() {
  // Example: Start with '98' to simulate typical Nepali mobile numbers
  const prefix = '98';
  const remainingDigits = Math.floor(10000000 + Math.random() * 90000000); // Ensures 8 digits
  return prefix + remainingDigits.toString();
}

module.exports = {
  generateTenDigitPhoneNumber
};
