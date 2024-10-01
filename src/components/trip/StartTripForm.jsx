import React, { useState } from "react";
import vehiclesData from "../../data/Vehicles"; // Adjust path if necessary
import driversData from "../../data/Drivers"; // Adjust path if necessary
import eSealData from "../../data/Eseal"; // Assuming you have a similar structure for eSeals

const StartTripForm = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [vehicleError, setVehicleError] = useState("");
  const [driverId, setDriverId] = useState("");
  const [driverDetails, setDriverDetails] = useState(null);
  const [driverError, setDriverError] = useState("");
  const [eSeal, setESeal] = useState([]);
  const [eSealError, setESealError] = useState("");
  const [gpsMountedDate, setGpsMountedDate] = useState("");
  const [tripStartingDate, setTripStartingDate] = useState("");
  const [fromto, setFromTo] = useState("");
  const [Checkpoints, setCheckpoints] = useState("");

  // Function to find vehicle by plate number if its status is not active
  const handleFindVehicle = () => {
    const foundVehicle = vehiclesData.find(
      (vehicle) =>
        vehicle.plateNumber === plateNumber && vehicle.status !== "Active"
    );
    if (foundVehicle) {
      setVehicleDetails(foundVehicle);
      setVehicleError(""); // Clear error if found
    } else {
      setVehicleError("Vehicle not found or it is Active!");
      setVehicleDetails(null); // Clear previous details
    }
  };

  // Function to find driver by ID if their status is not active
  const handleFindDriver = () => {
    const foundDriver = driversData.find(
      (driver) => driver.driverId === driverId && driver.status !== "Active"
    );
    if (foundDriver) {
      setDriverDetails(foundDriver);
      setDriverError(""); // Clear error if found
    } else {
      setDriverError("Driver not found or they are Active!");
      setDriverDetails(null); // Clear previous details
    }
  };

  // Function to add eSeal (or check eSeal status)
  const handleFindESeal = (eSealId) => {
    const foundESeal = eSealData.find(
      (seal) => seal.id === eSealId && seal.status !== "Active"
    );
    if (foundESeal) {
      setESeal([...eSeal, foundESeal]);
      setESealError(""); // Clear error if found
    } else {
      setESealError("eSeal not found or it is Active!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicleData = {
      vehicleName: vehicleDetails?.vehicleName || "",
      brand: vehicleDetails?.brand || "",
      model: vehicleDetails?.model || "",
      plateNumber,
      driverId,
      eSeal,
      gpsMountedDate,
      tripStartingDate,
      Checkpoints,
      fromto,
      Signal: "",
      Warnings: "",
      Problems: "",
    };

    console.log(vehicleData);
  };

  return (
    <form className="form wh-fit-content singleColumn" onSubmit={handleSubmit}>
      <h2>Add Vehicle Details</h2>
      <div className="form-flex grid">
        {/* Plate Number and Vehicle */}
        <div className="twoSections">
          <label>
            <input
              className="input "
              type="text"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              required
            />
            <span>Plate Number:</span>
          </label>
          <button
            type="button"
            className="c-button margindata"
            onClick={handleFindVehicle}
          >
            <span class="c-main">
              <span class="c-ico">
                <span class="c-blur"></span> <span class="ico-text">+</span>
              </span>
              Get
            </span>
          </button>
          <div className="tripdata">
            {vehicleError && <p className="error ">{vehicleError}</p>}
            {vehicleDetails && (
              <div>
                {/* <h3>Vehicle Found (Not Active):</h3> */}
                <p>Vehicle Name: {vehicleDetails.vehicleName}</p>
                <p>Brand: {vehicleDetails.brand}</p>
                <p>Model: {vehicleDetails.model}</p>
                {/* Add other vehicle details as necessary */}
              </div>
            )}
          </div>
        </div>

        {/* Driver ID and Driver */}
        <div className="twoSections">
          <label>
            <input
              className="input"
              type="text"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              required
            />
            <span>Driver ID:</span>
          </label>
          <button
            type="button"
            className="tripdatabutton"
            onClick={handleFindDriver}
          >
            Get
          </button>
          <div className="tripdatadata">
            {driverError && <p className="error">{driverError}</p>}
            {driverDetails && (
              <div>
                <h3>Driver Found (Not Active):</h3>
                <p>Driver Name: {driverDetails.driverName}</p>
                {/* Add other driver details as necessary */}
              </div>
            )}
          </div>
        </div>

        {/* eSeal Section */}
        <div className="twoSections">
          <button
            type="button"
            className="tripdatabutton"
            onClick={handleFindESeal}
          >
            Get eSeal
          </button>
          {eSealError && <p className="error">{eSealError}</p>}
          {eSeal.length > 0 && (
            <div>
              <h3>eSeals Found (Not Active):</h3>
              {eSeal.map((seal) => (
                <div key={seal.id}>
                  <p>Device Name: {seal.deviceName}</p>
                  <p>Brand: {seal.brand}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* GPS and Trip Info */}
        <label>
          <input
            className="input"
            type="date"
            value={gpsMountedDate}
            onChange={(e) => setGpsMountedDate(e.target.value)}
          />
          <span>GPS Mounted Date:</span>
        </label>
        <label>
          <input
            className="input"
            type="date"
            value={tripStartingDate}
            onChange={(e) => setTripStartingDate(e.target.value)}
          />
          <span>Trip Starting Date:</span>
        </label>
        <label>
          <input
            className="input"
            type="text"
            value={Checkpoints}
            onChange={(e) => setCheckpoints(e.target.value)}
          />
          <span>Checkpoints:</span>
        </label>
        <label>
          <input
            className="input"
            type="text"
            value={fromto}
            onChange={(e) => setFromTo(e.target.value)}
          />
          <span>From-To:</span>
        </label>

        <button type="submit" className="submit placeEnd">
          Submit
        </button>
      </div>
    </form>
  );
};

export default StartTripForm;
