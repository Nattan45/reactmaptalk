const ActiveVehicleDetails = ({ vehicleId, vehicleData }) => {
  if (!vehicleData || vehicleData.length === 0 || !vehicleId) {
    return (
      <div className="vehicleDetails" style={{ color: "red" }}>
        <h3>Vehicle Details</h3>
        <ul>
          <li>Trip ID: Not selected</li>
          <li>Driver ID: Not selected</li>
          <li>Plate Number: Not selected</li>
          <li>Brand: Not selected</li>
          <li>Model: Not selected</li>
          <li>GPS: Not selected</li>
        </ul>
      </div>
    );
  }

  const selectedVehicle = vehicleData.find(
    (vehicle) => vehicle.id === vehicleId
  );

  if (!selectedVehicle) {
    return (
      <div className="vehicleDetails" style={{ color: "red" }}>
        <h3>Vehicle Details</h3>
        <ul>
          <li>Trip ID: Not selected</li>
          <li>Driver ID: Not selected</li>
          <li>Plate Number: Not selected</li>
          <li>Brand: Not selected</li>
          <li>Model: Not selected</li>
          <li>GPS: Not selected</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="vehicleDetails">
      <h3>Vehicle Details</h3>
      <ul>
        <li>Trip ID: {selectedVehicle.tripId}</li>
        <li>Driver ID: {selectedVehicle.driverId}</li>
        <li>Plate Number: {selectedVehicle.plateNumber}</li>
        <li>Brand: {selectedVehicle.brand}</li>
        <li>Model: {selectedVehicle.model}</li>
        <li>GPS: {selectedVehicle.eSeal}</li>
      </ul>
    </div>
  );
};

export default ActiveVehicleDetails;
