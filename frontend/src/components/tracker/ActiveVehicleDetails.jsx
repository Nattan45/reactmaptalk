const ActiveVehicleDetails = ({ tripId, tripData }) => {
  console.log("---vehicleId-------", tripId);

  // console.log("---vehicleData-------", vehicleData);

  // Check for vapd vehicleData and vehicleId
  if (!tripData || tripData.length === 0 || !tripId) {
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
  const selectedTrip = tripData.find((trip) => trip.id === tripId);
  console.log("---selectedTrip-------", selectedTrip);

  // If the selected vehicle is not found, display a message
  if (!selectedTrip) {
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

  // // Helper function to find problem details by problem ID
  // const findProblemDetails = (problemId) => {
  //   return problemData.find((problem) => problem.id === problemId);
  // };
  // Render the details of the selected vehicle
  return (
    <div className="vehicle-card">
      <div className="trip-id">
        <p>
          Trip ID:{" "}
          <span className="darktext">
            {selectedTrip.tripTicketId || "Not available"}
          </span>
        </p>
      </div>
      <br />
      <div className="statuslists">
        <p>
          Driver ID:{" "}
          <span className="darktext">
            {selectedTrip.driver ? selectedTrip.driver.driverId : "No Driver"}
          </span>
        </p>
        <p>
          Plate Number:{" "}
          <span className="darktext">
            {selectedTrip.vehicle
              ? selectedTrip.vehicle.plateNumber
              : "No Driver"}
          </span>
        </p>
        <p>
          Brand:{" "}
          <span className="darktext">
            {selectedTrip.vehicle ? selectedTrip.vehicle.brand : "No Driver"}
          </span>
        </p>
        <p>
          Model:{" "}
          <span className="darktext">
            {selectedTrip.vehicle ? selectedTrip.vehicle.model : "No Driver"}
          </span>
        </p>
        <br />
        <p>
          GPS:
          {Array.isArray(selectedTrip.electronicSealIds) &&
          selectedTrip.electronicSealIds.length > 0 ? (
            <span style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {selectedTrip.electronicSealIds.map((eSealItem) => (
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
                  {eSealItem.tagName}
                </button>
              ))}
            </span>
          ) : (
            "Not available"
          )}
        </p>
        <br />
        <p>
          GPS Mounted On:{" "}
          <span className="darktext">
            {selectedTrip.gpsMountedDate
              ? new Date(selectedTrip.gpsMountedDate)
                  .toISOString()
                  .split("T")[0]
              : "Not available"}
          </span>
        </p>
        <p>
          Trip Starting Date:{" "}
          <span className="darktext">
            {selectedTrip.tripStartingDate
              ? new Date(selectedTrip.tripStartingDate)
                  .toISOString()
                  .split("T")[0]
              : "Not available"}
          </span>
        </p>
        <br />

        <p>
          Checkpoints:{" "}
          {Array.isArray(selectedTrip.checkpointIds) &&
          selectedTrip.checkpointIds.length > 0 ? (
            <span style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {selectedTrip.checkpointIds.map((cp) => (
                <button
                  key={cp.id}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0", // Optional: background color
                    color: "#333", // Optional: text color
                  }}
                >
                  {cp.rectangleName}
                </button>
              ))}
            </span>
          ) : (
            "Not available"
          )}
        </p>
        <p>
          From: &nbsp;
          <span className="darktext">
            {selectedTrip.destination || "Not available"}
          </span>
          <br />
          To: &nbsp;
          <span className="darktext">
            {selectedTrip.destination || "Not available"}
          </span>
        </p>
      </div>
      <br />
      <div className="signal-section">
        <p>
          Signal:{" "}
          <span className="darktext">
            {selectedTrip.Signal || "Not available"}
          </span>
        </p>
        <p>
          Warnings:{" "}
          {Array.isArray(selectedTrip.warnings) &&
          selectedTrip.warnings.length > 0 ? (
            <span style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {selectedTrip.warnings.map((warning) => (
                <button
                  key={warning.id}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0", // Optional: background color
                    color: "#333", // Optional: text color
                  }}
                >
                  {warning.message}
                </button>
              ))}
            </span>
          ) : (
            "Not available"
          )}
        </p>
        <p>
          Problems:{" "}
          {Array.isArray(selectedTrip.problems) &&
          selectedTrip.problems.length > 0 ? (
            <span style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {selectedTrip.problems.map((problem) => (
                <button
                  key={problem.id}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0", // Optional: background color
                    color: "#333", // Optional: text color
                  }}
                >
                  {problem.description}
                </button>
              ))}
            </span>
          ) : (
            "Not available"
          )}
        </p>
      </div>
    </div>
  );
};

export default ActiveVehicleDetails;
