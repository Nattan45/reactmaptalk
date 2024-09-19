export const calculatePolygonDetails = (coordinates) => {
  if (!coordinates || coordinates.length === 0) return null;

  // Dummy calculation for area, you can replace this with the actual formula
  const area = Math.abs(
    coordinates.reduce((sum, coord, index, arr) => {
      if (index === arr.length - 1) return sum;
      const nextCoord = arr[index + 1];
      return sum + (coord[0] * nextCoord[1] - nextCoord[0] * coord[1]);
    }, 0) / 2
  );

  return {
    area: area.toFixed(2),
  };
};
