// validateVehicleRegistration.js

function vehicleRegistration(vehicleData) {
  const errors = [];

  // Check if vehicleName is present and does not contain invalid characters
  if (!vehicleData.vehicleName) {
    errors.push("Vehicle name is required");
  } else if (/[^a-zA-Z0-9\s-]/.test(vehicleData.vehicleName)) {
    errors.push("Vehicle name contains invalid characters");
  }

  // Check if brand is present and does not contain invalid characters
  if (!vehicleData.brand) {
    errors.push("Brand is required");
  } else if (/[^a-zA-Z0-9\s]/.test(vehicleData.brand)) {
    errors.push("Brand contains invalid characters");
  }

  // Check if model is present and does not contain invalid characters
  if (!vehicleData.model) {
    errors.push("Model is required");
  } else if (/[^a-zA-Z0-9\s]/.test(vehicleData.model)) {
    errors.push("Model contains invalid characters");
  }

  // Check if plateNumber is present and in the correct format (state-identifier-code)
  if (!vehicleData.plateNumber) {
    errors.push("Plate number is required");
  } else {
    const plateNumberPattern =
      /^([a-zA-Z]{2})-([a-zA-Z-0-9]{1,6})-([a-zA-Z0-9]{1})$/;
    if (!plateNumberPattern.test(vehicleData.plateNumber)) {
      errors.push(
        "Plate number must follow the format: state-identifier-code (e.g., AB-123456-C)"
      );
    }

    // Extract parts to ensure they meet the length constraints
    const [state, identifier, code] = vehicleData.plateNumber.split("-");
    if (state.length !== 2) {
      errors.push("State in plate number must be exactly 2 characters");
    }
    if (identifier.length > 6) {
      errors.push("Identifier in plate number must be at most 6 characters");
    }
    if (code.length !== 1) {
      errors.push("Code in plate number must be exactly 1 character");
    }
  }

  return errors.length > 0 ? errors : null;
}

module.exports = vehicleRegistration;
