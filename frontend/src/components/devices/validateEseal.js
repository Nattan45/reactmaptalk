// formValidator.js

// Regex to validate UUID format for RFID keys
const uuidOrNumberRegex =
  /^(?:\d+|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;

// Regex to validate device name and brand (alphanumeric, hyphen, and space allowed)
const nameBrandRegex = /^[a-zA-Z0-9- ]+$/;

/**
 * Validate form data for RFID keys, device name, and brand.
 *
 * @param {Object} formData - The form data to validate.
 * @param {string} formData.deviceName - The name of the device.
 * @param {string} formData.brand - The brand of the device.
 * @param {Array<string>} formData.rfidKeys - The array of valid RFID keys.
 * @returns {Object} An object containing valid status and error message (if any).
 */
export function validateFormData({ deviceName, brand, rfidKeys }) {
  // Validate device name
  if (!nameBrandRegex.test(deviceName)) {
    return {
      valid: false,
      errorMessage:
        "Device name can only contain letters, numbers, hyphens, and spaces.",
    };
  }

  // Validate brand
  if (!nameBrandRegex.test(brand)) {
    return {
      valid: false,
      errorMessage:
        "Brand name can only contain letters, numbers, hyphens, and spaces.",
    };
  }

  // Validate RFID keys (check if empty or invalid format)
  if (
    rfidKeys.length === 0 ||
    !rfidKeys.every((key) => uuidOrNumberRegex.test(key))
  ) {
    return {
      valid: false,
      errorMessage: "Please enter a valid RFID key.",
    };
  }

  // If everything is valid
  return { valid: true };
}
