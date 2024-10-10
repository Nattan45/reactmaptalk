/**
 * Calculate the area of a rectangle based on geographic coordinates.
 *
 * This function approximates the area using the Haversine formula for
 * distances between two latitude/longitude points on the Earth,
 * assuming a spherical Earth. The result is given in square meters (m²).
 *
 * @param {Array<number>} lowerLeft - The lower-left corner [longitude, latitude] of the rectangle.
 * @param {Array<number>} upperRight - The upper-right corner [longitude, latitude] of the rectangle.
 * @returns {number} - The area of the rectangle in square meters.
 */
export const calculateAreaOfRectangle = (lowerLeft, upperRight) => {
  const R = 6371e3; // Radius of the Earth in meters

  // Convert coordinates to radians
  const lat1 = (lowerLeft[1] * Math.PI) / 180;
  const lat2 = (upperRight[1] * Math.PI) / 180;
  const deltaLat = lat2 - lat1;
  const deltaLng = ((upperRight[0] - lowerLeft[0]) * Math.PI) / 180;

  // Haversine formula to calculate the length of each side
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceWidth = R * c; // Horizontal distance (longitude difference)

  // Calculate the height using the latitude difference
  const distanceHeight = R * deltaLat;

  // Calculate and return the area as a number
  return Math.abs(distanceWidth * distanceHeight); // Return the area in square meters
};

// read more about this function in            >>>  src/Documentations/Screenshot 2024-09-18 231425.png
