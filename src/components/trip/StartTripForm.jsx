import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import vehiclesData from "../../data/Vehicles"; // Adjust path if necessary
import driversData from "../../data/Drivers"; // Adjust path if necessary
import eSealData from "../../data/Eseal"; // Adjust path if necessary

const StartTripForm = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [vehicleError, setVehicleError] = useState("");
  const [driverId, setDriverId] = useState("");
  const [driverDetails, setDriverDetails] = useState(null);
  const [driverError, setDriverError] = useState("");
  const [gpsId, setGpsId] = useState(""); // GPS ID state
  const [eSeal, setESeal] = useState(null); // Single eSeal state
  const [eSealError, setESealError] = useState("");
  const [eSealList, setESealList] = useState([]); // List of added eSeals
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

  // Function to find eSeal by GPS ID if its status is not active
  const handleFindESeal = () => {
    const foundESeal = eSealData.find(
      (seal) => seal.gpsId === gpsId && seal.status !== "Active"
    );
    if (foundESeal) {
      setESeal(foundESeal);
      setESealError(""); // Clear error if found
    } else {
      setESealError("eSeal not found or it is Active!");
      setESeal(null); // Clear previous eSeal data
    }
  };

  // Function to add eSeal to the list
  const handleAddESeal = () => {
    if (eSeal) {
      setESealList([...eSealList, eSeal]);
      setESeal(null); // Clear eSeal after adding
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
      eSealList, // Updated to use the eSealList
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

  const theme = createTheme({
    palette: {
      primary: {
        main: "#74aa65",
      },
      secondary: {
        main: "#FF5733",
      },
    },
  });

  return (
    <form className="form wh-fit-content singleColumn" onSubmit={handleSubmit}>
      <div className="formTitle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-tickets-plane"
        >
          <path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12" />
          <path d="m12 13.5 3.75.5" />
          <path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" />
          <path d="M6 10V8" />
          <path d="M6 14v1" />
          <path d="M6 19v2" />
          <rect x="2" y="8" width="20" height="13" rx="2" />
        </svg>
        <p className="title textcenter">Create Trip Form</p>
      </div>
      <br />
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
          <ThemeProvider theme={theme}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleFindVehicle}
              style={{ width: "100px", marginLeft: "35px" }}
              className="margindata"
            >
              Get
            </Button>
          </ThemeProvider>
          <div className="tripdata">
            {vehicleError && <p className="error">{vehicleError}</p>}
            {vehicleDetails && (
              <div>
                <p className="selected">
                  Vehicle: {vehicleDetails.vehicleName} {vehicleDetails.brand}{" "}
                  {vehicleDetails.model}
                </p>
                <p>plateNumber: {vehicleDetails.plateNumber} </p>
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
          <ThemeProvider theme={theme}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleFindDriver}
              style={{ width: "100px", marginLeft: "35px" }}
              className="margindata"
            >
              Get
            </Button>
          </ThemeProvider>
          <div className="tripdatadata">
            {driverError && <p className="error">{driverError}</p>}
            {driverDetails && (
              <div>
                <p className="selected">
                  Driver: {driverDetails.firstName} {driverDetails.lastName}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* eSeal Section */}
        <div className="twoSections">
          <label>
            <input
              className="input"
              type="text"
              value={gpsId}
              onChange={(e) => setGpsId(e.target.value)}
              required
            />
            <span>GPS ID:</span>
          </label>
          <ThemeProvider theme={theme}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleFindESeal}
              style={{ width: "100px", marginLeft: "35px" }}
              className="margindata"
            >
              Get
            </Button>
          </ThemeProvider>
          <div className="tripdata">
            {eSealError && <p className="error">{eSealError}</p>}
            {eSeal && (
              <div>
                <p>Device Name: {eSeal.deviceName}</p>
                <p>Brand: {eSeal.brand}</p>
                <ThemeProvider theme={theme}>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleAddESeal}
                    style={{ width: "100px", marginLeft: "35px" }}
                    className="margindata"
                  >
                    Add
                  </Button>
                </ThemeProvider>
              </div>
            )}
          </div>

          {/* Display Added eSeals */}
          <div className="displayAddedeSeals">
            {eSealList.length > 0 ? (
              <div className="grid marginTop">
                <label className="textcenter">Selected Gps</label>
                <hr />
                <div className="threeCardRowContainer">
                  {eSealList.map((seal, index) => (
                    <div key={index}>
                      <p className="selected">{seal.gpsId}</p>
                    </div>
                  ))}
                </div>
                <hr />
              </div>
            ) : (
              <label className="textcenter">No Gps added yet.</label>
            )}
          </div>
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
