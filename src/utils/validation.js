function isValidEmail(email) {
    // Basic email validation using regex
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
  
  function isValidPassword(password) {
    // Simple password length validation
    return password.length >= 8; // You can adjust the criteria as needed
  }
  
  module.exports = {
    isValidEmail,
    isValidPassword,
  };
  