// Function to validate
export const validatePhoneNumber = (phoneNumber) => {
  const phonePattern = /^[0-9]+$/;
  return phonePattern.test(phoneNumber);
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
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

  // Validate Emergency Contact
  if (!validatePhoneNumber(formData.emergencyContact)) {
    errors.push("Emergency Contact is Phone Number");
  }

  // Validate first name and last name and gender
  if (containsNumbers(formData.firstName)) {
    errors.push("First name must not contain numbers.");
  }
  if (containsNumbers(formData.lastName)) {
    errors.push("Last name must not contain numbers.");
  }

  if (containsNumbers(formData.gender)) {
    errors.push("Gender must not contain numbers.");
  }

  return errors; // Return the array of errors
};
