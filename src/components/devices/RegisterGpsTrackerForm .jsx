import React, { useState } from "react";

import FreeRfid from "./FreeRfid";
import FreeRfids from "../../data/FreeRfids";

const RegisterGpsTrackerForm = () => {
  const [deviceName, setDeviceName] = useState("");
  const [brand, setBrand] = useState("");
  const [rfidKeys, setRfidKeys] = useState([""]); // Initialize with an empty field for RFID key
  const [rfidStatuses, setRfidStatuses] = useState([]); // Track RFID key statuses (found or not)

  // Function to handle adding a new RFID key input field
  const handleAddRfidKey = () => {
    setRfidKeys([...rfidKeys, ""]); // Add a new empty RFID key field
  };

  // Function to handle removing an RFID key input field
  const handleRemoveRfidKey = (index) => {
    const updatedKeys = rfidKeys.filter((_, i) => i !== index); // Remove the specific RFID key
    setRfidKeys(updatedKeys);
  };

  // Function to handle changes in RFID key input fields
  const handleRfidKeyChange = (index, value) => {
    const updatedKeys = [...rfidKeys];
    updatedKeys[index] = value; // Update the RFID key value at the specific index
    setRfidKeys(updatedKeys);

    // Check if the entered RFID key is found in the records
    checkRfidKeyStatus(value, index);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Filter out RFID keys that are not "Free"
    const validRfidKeys = rfidKeys.filter(
      (rfidKey, index) => rfidStatuses[index] === "found"
    );
    e.preventDefault();
    const formData = {
      deviceName,
      brand,
      rfidKeys: validRfidKeys, // Only save the valid RFID keys
    };
    console.log(JSON.stringify(formData, null, 2));
  };

  // Check if the RFID key exists in the 'Free' records
  const checkRfidKeyStatus = (rfidKey, index) => {
    const freeRecords = FreeRfids.filter((record) => record.status === "Free");
    const isFound = freeRecords.some((record) => record.RfidKey === rfidKey);

    const updatedStatuses = [...rfidStatuses];
    updatedStatuses[index] = isFound ? "found" : "not-found";
    setRfidStatuses(updatedStatuses);
  };

  return (
    <div className="registrationFormWithTable">
      <form className="form heightfit" onSubmit={handleSubmit}>
        <div className="formTitle">
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 582.675 582.675"
            xml="preserve"
            className="titleSvg"
          >
            <g>
              <g id="Layer_1_7_">
                <g>
                  <path
                    d="M387.599,62.475c-10.199,0-19.125,8.925-19.125,19.125c0,10.2,8.926,19.125,19.125,19.125
				c20.4,0,36.975,16.575,36.975,36.975c0,10.2,8.926,19.125,19.125,19.125c10.201,0,19.125-8.925,19.125-19.125
				C462.824,95.625,428.4,62.475,387.599,62.475z"
                  />
                  <path
                    d="M387.599,0c-10.199,0-19.125,8.925-19.125,19.125c0,10.2,8.926,19.125,19.125,19.125
				c54.826,0,99.451,44.625,99.451,99.45c0,10.2,8.924,19.125,19.125,19.125c10.199,0,19.125-8.925,19.125-19.125
				C525.3,61.2,462.824,0,387.599,0z"
                  />
                  <path
                    d="M368.474,127.5H89.25c-17.85,0-31.875,14.025-31.875,31.875V550.8c0,17.85,14.025,31.875,31.875,31.875h279.225
				c17.85,0,31.875-14.025,31.875-31.875V160.65C400.349,142.8,386.324,127.5,368.474,127.5z M95.625,165.75h33.15l-1.275,153
				H95.625V165.75z M95.625,355.725h51c10.2,0,19.125-8.925,19.125-19.125v-63.75h87.975v164.476h-158.1V355.725z M271.574,548.25
				c0,10.2-8.925,19.125-19.125,19.125H209.1c-10.2,0-19.125-8.925-19.125-19.125v-2.55c0-10.2,8.925-19.125,19.125-19.125h43.35
				c10.2,0,19.125,8.925,19.125,19.125V548.25z M363.375,508.725H95.625V476.85h178.5c10.2,0,19.125-8.925,19.125-19.125v-183.6
				h70.125V508.725L363.375,508.725z M363.375,235.875H165.75V165.75h196.35v70.125H363.375z"
                  />
                </g>
              </g>
            </g>
          </svg>
          <p className="title textcenter">Tracker Registration Form</p>
        </div>
        <br />
        <label className="textcenter">E-Seal Form</label>

        {/* Device Name */}
        <label>
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            required
            className="input"
          />
          <span>Brand Name</span>
        </label>

        <div className="form-flex">
          {/* Brand */}
          <label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="input"
            />
            <span>Model</span>
          </label>
        </div>

        {/* RFID Key Numbers */}
        <div className="newrfids">
          <label>RFID Keys</label>
          {rfidKeys.map((rfidKey, index) => (
            <div key={index} className="pendingRfidLists">
              <input
                type="text"
                value={rfidKey}
                onChange={(e) => handleRfidKeyChange(index, e.target.value)}
                required
                className={`input ${rfidStatuses[index]}`} // Apply class based on status
                placeholder="RFID Key"
              />

              <button
                type="button"
                onClick={() => handleRemoveRfidKey(index)}
                disabled={rfidKeys.length === 1} // Disable removal if it's the only input
                className="remove-rfid"
              >
                Remove
              </button>
              {/* Display SVG if the RFID key is found */}
              {rfidStatuses[index] === "found" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00ff6e"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-circle-check-big"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRfidKey}
            className="submit-rfid"
          >
            Add More
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit">
          Register
        </button>
      </form>
      <FreeRfid />
    </div>
  );
};

export default RegisterGpsTrackerForm;
