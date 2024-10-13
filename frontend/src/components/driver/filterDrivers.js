export const filterDrivers = (drivers, filterText) => {
  return drivers.filter((driver) => {
    const firstName = driver.firstName || "";
    const lastName = driver.lastName || "";
    const driverId = driver.driverId || "";
    const phone = driver.phoneNumber || "";
    const email = driver.email || "";

    return (
      firstName.includes(filterText) ||
      lastName.includes(filterText) ||
      driverId.includes(filterText) ||
      phone.includes(filterText) ||
      email.includes(filterText)
    );
  });
};
