export const filterDriveridPlatenumberTripId = (problems, filterText) => {
  if (!filterText) return problems; // If no filter text, return all problems

  return problems.filter((problem) => {
    const matchesPlateNumber = problem.plateNumber
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesTripId = problem.tripId
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesDriver =
      problem.driver &&
      problem.driver.some(
        (driver) =>
          driver.driverName.toLowerCase().includes(filterText.toLowerCase()) ||
          driver.driverId.toLowerCase().includes(filterText.toLowerCase())
      );

    return matchesPlateNumber || matchesTripId || matchesDriver;
  });
};
