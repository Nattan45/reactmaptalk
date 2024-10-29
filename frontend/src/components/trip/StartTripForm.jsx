import React, { useState, useEffect } from "react";

import axios from "axios";
import MessagePopup from "../messageComponent/MessagePopup";

const StartTripForm = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);

  const [driverId, setDriverId] = useState("");
  const [driverDetails, setDriverDetails] = useState(null);

  const [routeDetails, setRouteDetails] = useState(""); // Input for road number
  const [routeId, setRouteId] = useState("");

  const [gpsMountedDate, setGpsMountedDate] = useState("");
  const [tripStartingDate, setTripStartingDate] = useState("");

  const [eseals, setEseals] = useState([""]);
  const [esealStatuses, setEsealStatuses] = useState([]);
  const [storedEseal, setStoredEseal] = useState([]);

  const [Checkpoints, setCheckpoints] = useState("");

  const [startingPoint, setStartingPoint] = useState("");
  const [destination, setDestination] = useState("");

  // Message Toast
  const [messages, setMessages] = useState([]);
  // Add Message
  const addMessage = (text, type) => {
    const id = Date.now(); // Unique ID based on timestamp
    setMessages((prevMessages) => [...prevMessages, { id, text, type }]);
  };
  // Remove Message
  const removeMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  // Function to find vehicle by plate number if its status is not active
  const handleFindVehicle = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/vehicles-id-list`
      );

      const filteredVehicle = response.data.filter(
        (vehicle) =>
          vehicle.plateNumber === plateNumber &&
          vehicle.vehicleStatus === "WAITING"
      );

      if (filteredVehicle.length > 0) {
        setVehicleDetails(filteredVehicle);
      } else {
        setVehicleDetails(""); // Reset if no match
      }
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    }
  };

  useEffect(() => {
    if (plateNumber) {
      handleFindVehicle();
    }
  }, [plateNumber]); // Trigger whenever plateNumber changes

  // Function to find driver by ID if their status is not active
  const handleFindDriver = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/drivers-id-list`
      );

      const filteredDriver = response.data.filter(
        (driver) =>
          driver.driverId === driverId && driver.driverStatus === "ACTIVE"
      );

      if (filteredDriver.length > 0) {
        setDriverDetails(filteredDriver);
      } else {
        setDriverDetails(""); // Reset if no match
      }
    } catch (error) {
      console.error("Error fetching Driver:", error);
    }
  };

  useEffect(() => {
    if (driverId) {
      handleFindDriver();
    }
  }, [driverId]); // Trigger whenever driver Id changes

  // Function to find road by road Name
  const handleFindRoad = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/roads`
      );

      const filteredRoute = response.data.filter(
        (route) => route.routeId === routeId
      );

      if (filteredRoute.length > 0) {
        setRouteDetails(filteredRoute);
      } else {
        setRouteDetails(""); // Reset if no match
      }
    } catch (error) {
      console.error("Error fetching Route:", error);
    }
  };

  useEffect(() => {
    if (routeId) {
      handleFindRoad();
    }
  }, [routeId]); // Trigger whenever driver Id changes

  // Function to handle adding a new RFID key input field
  const handleAddEseal = () => {
    setEseals([...eseals, ""]);
  };

  // Function to handle removing an RFID key input field
  const handleRemoveEseal = (index) => {
    const updatedEseal = eseals.filter((_, i) => i !== index);
    const updatedIds = storedEseal.filter((_, i) => i !== index);
    const updatedStatuses = esealStatuses.filter((_, i) => i !== index);

    setEseals(updatedEseal);
    setStoredEseal(updatedIds);
    setEsealStatuses(updatedStatuses);
  };

  // Function to handle changes in RFID key input fields
  const handleRfidKeyChange = (index, value) => {
    const updatedKeys = [...eseals];
    updatedKeys[index] = value;
    setEseals(updatedKeys);

    checkEsealStatus(value, index);
  };

  const checkEsealStatus = async (tagName, index) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/Esealidlist`
      );

      const freeEseals = response.data;
      const freeRecords = freeEseals.filter(
        (eseal) => eseal.electronicSealStatus === "UNLOCKED"
      );

      // Check if the entered tagName is found among free records
      const foundRecord = freeRecords.find(
        (record) => record.tagName === tagName
      );

      const updatedStatuses = [...esealStatuses];
      const updatedstoredEseal = [...storedEseal];

      if (foundRecord) {
        updatedStatuses[index] = "found";
        updatedstoredEseal[index] = foundRecord.id; // Store the RFID id
      } else {
        updatedStatuses[index] = "not-found";
        updatedstoredEseal[index] = ""; // Clear the RFID id if not found
      }

      setEsealStatuses(updatedStatuses);
      setStoredEseal(updatedstoredEseal);
    } catch (err) {
      if (err.response) {
        const errorMessage =
          err.response.data.errorMessage ||
          err.response.data.message ||
          "An error occurred: 500";
        addMessage(errorMessage, "error");
      } else {
        addMessage("Network error: Unable to reach the server.", "error");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEseals = storedEseal.filter(
      (_, index) => esealStatuses[index] === "found"
    );

    const vehicleData = {
      vehicleName: vehicleDetails[0]?.id || "",
      driverId: driverDetails[0]?.id || "",
      roadNumber: routeDetails[0]?.id || "",

      gpsMountedDate,
      tripStartingDate,

      eSealList: validEseals,
      Checkpoints,

      startingPoint,
      destination,
    };

    console.log(JSON.stringify(vehicleData, null, 2));
  };

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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-tickets-plane"
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
        <div className="driverForm">
          <label className="driverLabel">
            <div className="driverInputSection">
              <input
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                required
                className="driverInput"
                placeholder="Plate Number"
              />
              <span className="driverLabelText">Vehicle Name</span>
            </div>

            {/* Display Route Name on the right side of the input */}
            <div className="driverNameSection">
              {vehicleDetails ? (
                <span className="driverName">
                  {vehicleDetails[0].vehicleName}
                </span>
              ) : (
                <span className="driverName">Waiting for ID...</span>
              )}
            </div>
          </label>
        </div>

        {/* Driver ID and Driver */}
        <div className="driverForm">
          <label className="driverLabel">
            <div className="driverInputSection">
              <input
                type="text"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                required
                className="driverInput"
                placeholder="Driver ID"
              />
              <span className="driverLabelText">Driver Name</span>
            </div>

            {/* Display Route Name on the right side of the input */}
            <div className="driverNameSection">
              {driverDetails ? (
                <span className="driverName">
                  {driverDetails[0].firstName} - {driverDetails[0].lastName}
                </span>
              ) : (
                <span className="driverName">Waiting for ID...</span>
              )}
            </div>
          </label>
        </div>

        {/* Route ID and Route Name */}
        <div className="driverForm">
          <label className="driverLabel">
            <div className="driverInputSection">
              <input
                type="text"
                value={routeId}
                onChange={(e) => setRouteId(e.target.value)}
                required
                className="driverInput"
                placeholder="Road ID"
              />
              <span className="driverLabelText">Road Name</span>
            </div>

            {/* Display Route Name on the right side of the input */}
            <div className="driverNameSection">
              {routeDetails ? (
                <span className="driverName">{routeDetails[0].routeName}</span>
              ) : (
                <span className="driverName">Waiting for ID...</span>
              )}
            </div>
          </label>
        </div>

        {/* eSeal Section */}
        <div className="twoGridRowCenter">
          <div className="newrfids">
            <label>Electronic Seal</label>
            {eseals.map((eseal, index) => (
              <div key={index} className="pendingRfidLists">
                <input
                  type="text"
                  value={eseal}
                  onChange={(e) => handleRfidKeyChange(index, e.target.value)}
                  required
                  className={`input ${esealStatuses[index]}`} // Apply class based on status
                  placeholder="Eseal-ID"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveEseal(index)}
                  disabled={eseals.length === 1} // Disable removal if it's the only input
                  className="remove-rfid"
                >
                  Remove
                </button>

                {esealStatuses[index] === "found" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00ff6e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-check-big"
                  >
                    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEseal}
              className="submit-rfid"
            >
              Add More
            </button>
          </div>

          <div className="newrfids">
            <label>Checkpoints</label>
            {/* {eseals.map((eseal, index) => ( */}
            {/* <div key={index} className="pendingRfidLists"> */}
            <div className="pendingRfidLists">
              <input
                type="text"
                // value={eseal}
                // onChange={(e) => handleRfidKeyChange(index, e.target.value)}
                required
                // className={`input ${esealStatuses[index]}`} // Apply class based on status
                placeholder="Checkpoints Id"
              />
              <button
                type="button"
                // onClick={() => handleRemoveEseal(index)}
                // disabled={eseals.length === 1} // Disable removal if it's the only input
                className="remove-rfid"
              >
                Remove
              </button>
              {/* {esealStatuses[index] === "found" && ( */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00ff6e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-check-big"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              {/* )} */}
            </div>
            {/* ))} */}
            <button
              type="button"
              // onClick={handleAddEseal}
              className="submit-rfid"
            >
              Add More
            </button>
          </div>
        </div>

        {/* GPS Mounted Date */}
        <label>
          <input
            className="input"
            type="date"
            value={gpsMountedDate}
            onChange={(e) => setGpsMountedDate(e.target.value)}
          />
          <span>GPS Mounted Date</span>
        </label>

        {/* Trip Starting Date */}
        <label>
          <input
            className="input"
            type="date"
            value={tripStartingDate}
            onChange={(e) => setTripStartingDate(e.target.value)}
          />
          <span>Trip Starting Date</span>
        </label>

        <label>
          <input
            className="input"
            type="text"
            value={Checkpoints}
            onChange={(e) => setCheckpoints(e.target.value)}
          />
          <span>Checkpoints</span>
        </label>
        <div className=""></div>

        <div className="twoGridRowCenter ">
          {/* Starting Point */}
          <label>
            <input
              className="input"
              type="text"
              value={startingPoint}
              onChange={(e) => setStartingPoint(e.target.value)}
              style={{ width: "250px" }}
            />
            <span>Starting Point</span>
          </label>

          {/* Destination */}
          <label>
            <input
              className="input"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{ width: "250px" }}
            />
            <span>Destination</span>
          </label>
        </div>

        <button type="submit" className="submit placeEnd">
          Submit
        </button>
      </div>

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </form>
  );
};

export default StartTripForm;
