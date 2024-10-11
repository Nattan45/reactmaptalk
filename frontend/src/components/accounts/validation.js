// validation.js

// Function to validate email format
export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Function to validate phone number
export const validatePhoneNumber = (phoneNumber) => {
  const phonePattern = /^[0-9]+$/;
  return phonePattern.test(phoneNumber);
};

// Function to check for numbers in a string
const containsNumbers = (str) => /\d/.test(str);

// Main validation function
export const validateFormData = (formData) => {
  const errors = [];

  // Validate email
  if (!validateEmail(formData.email)) {
    errors.push("Invalid email format.");
  }

  // Validate phone number
  if (!validatePhoneNumber(formData.phoneNumber)) {
    errors.push("Phone number must contain only digits.");
  }

  // Validate first name and last name
  if (containsNumbers(formData.firstName)) {
    errors.push("First name must not contain numbers.");
  }
  if (containsNumbers(formData.lastName)) {
    errors.push("Last name must not contain numbers.");
  }

  // Validate department and gender
  if (containsNumbers(formData.department)) {
    errors.push("Department must not contain numbers.");
  }
  if (containsNumbers(formData.gender)) {
    errors.push("Gender must not contain numbers.");
  }

  return errors; // Return the array of errors
};
