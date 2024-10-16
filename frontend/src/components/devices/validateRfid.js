// validateRfid.js

// Function to validate RFID type and keyCode
const validateRfid = (formData) => {
  const { rfidType, keyCode } = formData;

  // Define allowed RFID types
  const allowedRfidTypes = ["ACTIVE_RFID", "PASSIVE_RFID"];

  // Validate RFID type
  const formattedRfidType = rfidType.toUpperCase().replace(" ", "_"); // Convert to uppercase and replace space with _
  if (!allowedRfidTypes.includes(formattedRfidType)) {
    return {
      valid: false,
      error:
        'Invalid RFID type. It should be either "ACTIVE_RFID" or "PASSIVE_RFID".',
    };
  }

  // Validate keyCode: It should contain alphabets, numbers, and a dash (-)
  const keyCodeRegex = /^[a-zA-Z0-9-]+$/;
  if (!keyCodeRegex.test(keyCode)) {
    return {
      valid: true,
      error: "Invalid keyCode.",
    };
  }

  // If both validations pass
  return { valid: true, error: null };
};

// Export the validation function
module.exports = validateRfid;
