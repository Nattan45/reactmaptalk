// Function to validate RFID type and keyCode
const rfidRegistration = (formData) => {
  const { rfidType, keyCode } = formData;

  // Define allowed RFID types
  const allowedRfidTypes = ["ACTIVE_RFID", "PASSIVE_RFID"];

  // Initialize an array to collect validation errors
  const validationErrors = [];

  // Validate RFID type
  const formattedRfidType = rfidType.toUpperCase().replace(" ", "_"); // Convert to uppercase and replace space with _
  if (!allowedRfidTypes.includes(formattedRfidType)) {
    validationErrors.push(
      'Invalid RFID type. It should be either "ACTIVE_RFID" or "PASSIVE_RFID".'
    );
  }

  // Validate keyCode: It should contain alphabets, numbers, and a dash (-)
  const keyCodeRegex = /^[a-zA-Z0-9-]+$/;
  if (!keyCodeRegex.test(keyCode)) {
    validationErrors.push(
      "Invalid keyCode. It should only contain alphabets, numbers, and dashes (-)."
    );
  }

  // If there are validation errors, return them
  if (validationErrors.length > 0) {
    return {
      valid: false,
      errors: validationErrors,
    };
  }

  // If both validations pass
  return { valid: true, errors: null };
};

// Export the validation function
module.exports = rfidRegistration;
