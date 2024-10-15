function driverProfile(userData) {
  const errors = [];

  // Check if firstName is provided and only contains letters
  if (!userData.firstName || !/^[A-Za-z]+$/.test(userData.firstName)) {
    errors.push("Invalid first name: Only letters are allowed.");
  }

  // Check if lastName is provided and only contains letters
  if (!userData.lastName || !/^[A-Za-z]+$/.test(userData.lastName)) {
    errors.push("Invalid last name: Only letters are allowed.");
  }

  // Check if phoneNumber is provided and contains only numbers
  if (!userData.phoneNumber || !/^\d+$/.test(userData.phoneNumber)) {
    errors.push("Invalid phone number: Only digits are allowed.");
  }

  // Check if emergency Contact is provided and contains only numbers
  if (!userData.emergencyContact || !/^\d+$/.test(userData.emergencyContact)) {
    errors.push("Emergency Contact phone number: Only digits are allowed.");
  }
  // Check if email is provided and is in a valid format
  if (!userData.email || !/^\S+@\S+\.\S+$/.test(userData.email)) {
    errors.push("Invalid email address.");
  }

  // Check if gender is provided and is either "MALE" or "FEMALE"
  if (
    !userData.gender ||
    !["MALE", "FEMALE"].includes(userData.gender.toUpperCase())
  ) {
    errors.push("Invalid gender: Must be either 'MALE' or 'FEMALE'.");
  }

  // Return an array of errors if any, or null if validation passes
  return errors.length ? errors : null;
}

module.exports = driverProfile;
