// custom-fixtures.js


//generate random phonenumber
function generateTenDigitPhoneNumber() {
  // Example: Start with '98' to simulate typical Nepali mobile numbers
  const prefix = '98';
  const remainingDigits = Math.floor(10000000 + Math.random() * 90000000); // Ensures 8 digits
  return prefix + remainingDigits.toString();
}


//random string generator 
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateRandomString(length){
  let result = '';

  const charLength = characters.length;
  for (let i= 0; i < length; i++){
    result += characters.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

function generateRandomNumber(){
  let result = '';
 const ranNum = Math.floor(Math.random() * 10000);
  return result;
}

module.exports = {
  generateTenDigitPhoneNumber,
  generateRandomString,
  generateRandomNumber
};
