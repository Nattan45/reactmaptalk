// Function to validate the plate number format (state-identifier-code)
export const validatePlateNumber = (plateNumber) => {
  const { state, identifier, code } = plateNumber;

  // Check if the state is exactly 2 characters
  if (state.length !== 2) {
    return "State should be exactly 2 characters.";
  }

  // Check if the identifier is between 1 to 6 alphanumeric characters
  const identifierPattern = /^[A-Z0-9]{1,6}$/;
  if (!identifierPattern.test(identifier)) {
    return "Identifier should be between 1 to 6 alphanumeric characters.";
  }

  // Check if the code is exactly 1 digit
  if (code.length !== 1 || !/^\d$/.test(code)) {
    return "Code should be exactly 1 digit.";
  }

  // If all conditions are met, return null (no error)
  return null;
};

// Function to validate vehicle name, brand, and model
export const validateTextFields = (value) => {
  // Disallow special characters like #@%
  const pattern = /^[a-zA-Z0-9 -]+$/;

  if (!pattern.test(value)) {
    return "Field should not contain special characters like #, @, %, etc.";
  }

  return null;
};
