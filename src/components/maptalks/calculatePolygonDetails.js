export function calculatePolygonDetails(coordinates) {
  const R = 6371e3; // Radius of the Earth in meters

  // Convert degrees to radians
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  let area = 0;
  const numPoints = coordinates.length;

  for (let i = 0; i < numPoints; i++) {
    const [lon1, lat1] = coordinates[i];
    const [lon2, lat2] = coordinates[(i + 1) % numPoints];

    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);
    const deltaLonRad = toRadians(lon2 - lon1);

    // Haversine formula to calculate the length of each side
    const a =
      Math.sin(deltaLonRad / 2) *
      Math.sin(deltaLonRad / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the segment area
    const segmentArea = R * R * c;

    area += segmentArea;
  }

  area = Math.abs(area) / 2;

  const areaInKm2 = area / 1e6; // Convert to square kilometers

  // Format the area to three decimal places
  const formattedArea = areaInKm2.toFixed(3);

  return {
    area: formattedArea,
    unit: "km²",
  };
}
