// export const filterDriveridPlatenumberTripId = (problems, filterText) => {
//   if (!filterText) return problems; // If no filter text, return all problems

//   return problems.filter((problem) => {
//     const matchesPlateNumber = problem.plateNumber
//       .toLowerCase()
//       .includes(filterText.toLowerCase());
//     const matchesTripId = problem.tripId
//       .toLowerCase()
//       .includes(filterText.toLowerCase());
//     const matchesDriver =
//       problem.driver &&
//       problem.driver.some(
//         (driver) =>
//           driver.driverName.toLowerCase().includes(filterText.toLowerCase()) ||
//           driver.driverId.toLowerCase().includes(filterText.toLowerCase())
//       );

//     return matchesPlateNumber || matchesTripId || matchesDriver;
//   });
// };
export const filterDriveridPlatenumberTripId = (problems, filterText) => {
  if (!filterText) return problems; // If no filter text, return all problems

  return problems.filter((problem) => {
    const matchesPlateNumber = problem?.vehicle?.plateNumber
      ?.toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesTripId = problem?.tripTicketId
      ?.toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesDriver =
      problem?.driver &&
      (problem.driver.firstName
        ?.toLowerCase()
        .includes(filterText.toLowerCase()) ||
        problem.driver.driverId
          ?.toLowerCase()
          .includes(filterText.toLowerCase()));

    return matchesPlateNumber || matchesTripId || matchesDriver;
  });
};
