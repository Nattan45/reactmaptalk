import problemData from "../../data/Problem";

const ActiveVehicleDetails = ({ vehicleId, vehicleData }) => {
  // Check for vapd vehicleData and vehicleId
  if (!vehicleData || vehicleData.length === 0 || !vehicleId) {
    return (
      <div className="vehicleDetails vehicle-card" style={{ color: "red" }}>
        <div className="trip-id">
          <p>Trip ID: Not selected</p>
        </div>
        <br />
        <p>Driver ID: Not selected</p>
        <p>Plate Number: Not selected</p>
        <p>Brand: Not selected</p>
        <p>Model: Not selected</p>
        <p>GPS: Not selected</p>
        <p>GPS Mounted On: Not selected</p>
        <p>Trip Starting Date: Not selected</p>
        <p>Checkpoints: Not selected</p>
        <p>Trip: Not selected</p>
        <br />
        <div className="signal-section">
          <p>Signal: Not selected</p>
          <p>Warnings: Not selected</p>
          <p>Problems: Not selected</p>
        </div>
      </div>
    );
  }

  // Find the selected vehicle
  const selectedVehicle = vehicleData.find(
    (vehicle) => vehicle.id === vehicleId
  );

  // If the selected vehicle is not found, display a message
  if (!selectedVehicle) {
    return (
      <div className="vehicleDetails vehicle-card" style={{ color: "red" }}>
        <div className="trip-id">
          <p>Trip ID: Not selected</p>
        </div>
        <br />
        <p>Driver ID: Not selected</p>
        <p>Plate Number: Not selected</p>
        <p>Brand: Not selected</p>
        <p>Model: Not selected</p>
        <p>GPS: Not selected</p>
        <p>GPS Mounted On: Not selected</p>
        <p>Trip Starting Date: Not selected</p>
        <p>Checkpoints: Not selected</p>
        <p>Trip: Not selected</p>
        <br />
        <div className="signal-section">
          <p>Signal: Not selected</p>
          <p>Warnings: Not selected</p>
          <p>Problems: Not selected</p>
        </div>
      </div>
    );
  }

  // Helper function to find problem details by problem ID
  const findProblemDetails = (problemId) => {
    return problemData.find((problem) => problem.id === problemId);
  };
  // Render the details of the selected vehicle
  return (
    <div className="vehicle-card">
      <div className="trip-id">
        <p>
          Trip ID:{" "}
          <span className="darktext">
            {selectedVehicle.tripId || "Not available"}
          </span>
        </p>
      </div>
      <br />
      <div className="statuslists">
        <p>
          Driver ID:{" "}
          <span className="darktext">
            {Array.isArray(selectedVehicle.driver) &&
              selectedVehicle.driver.map((driver, index) => (
                <p key={index}>{driver.driverId || "Not available"}</p>
              ))}
          </span>
        </p>
        <p>
          Plate Number:{" "}
          <span className="darktext">
            {selectedVehicle.plateNumber || "Not available"}
          </span>
        </p>
        <p>
          Brand:{" "}
          <span className="darktext">
            {selectedVehicle.brand || "Not available"}
          </span>
        </p>
        <p>
          Model:{" "}
          <span className="darktext">
            {selectedVehicle.model || "Not available"}
          </span>
        </p>
        <p>
          GPS:
          {Array.isArray(selectedVehicle.eSeal) &&
          selectedVehicle.eSeal.length > 0 ? (
            <span style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {selectedVehicle.eSeal.map((eSealItem) => (
                <button
                  key={eSealItem.id}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0", // Optional: background color
                    color: "#333", // Optional: text color
                  }}
                >
                  {eSealItem.gpsId}
                </button>
              ))}
            </span>
          ) : (
            "Not available"
          )}
        </p>
        <p>
          GPS Mounted Date:{" "}
          <span className="darktext">
            {selectedVehicle.gpsMountedDate || "Not available"}
          </span>
        </p>
        <p>
          Trip Starting Date:{" "}
          <span className="darktext">
            {selectedVehicle.tripStartingDate || "Not available"}
          </span>
        </p>
        <p>
          Checkpoints:{" "}
          <span className="darktext">
            {selectedVehicle.Checkpoints
              ? selectedVehicle.Checkpoints.join(", ")
              : "Not available"}
          </span>
        </p>
        <p>
          Trip:{" "}
          <span className="darktext">
            {selectedVehicle.fromto || "Not available"}
          </span>
        </p>
      </div>
      <br />
      <div className="signal-section">
        <p>
          Signal:{" "}
          <span className="darktext">
            {selectedVehicle.Signal || "Not available"}
          </span>
        </p>
        <p>
          Warnings:{" "}
          <span className="darktext">
            {selectedVehicle.Warnings || "Not available"}
          </span>
        </p>
        <p>
          Problems:{" "}
          <span className="darktext">
            {Array.isArray(selectedVehicle.Problems) &&
            selectedVehicle.Problems.length > 0 ? (
              selectedVehicle.Problems.map((problem) => {
                const problemDetails = findProblemDetails(problem.id);
                return (
                  <p key={problem.id}>
                    {problemDetails ? (
                      <span>{problemDetails.Details}</span>
                    ) : (
                      <p>No problem.</p>
                    )}
                  </p>
                );
              })
            ) : (
              <p>No problems.</p>
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ActiveVehicleDetails;
