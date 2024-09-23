import React, { useState } from "react";

const RegisterGpsTrackerForm = () => {
  const [deviceName, setDeviceName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [rfidKeys, setRfidKeys] = useState([""]); // Initialize with an empty field for RFID key

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
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      deviceName,
      brand,
      model,
      rfidKeys, // This will contain all RFID keys entered by the user
    };
    console.log("Form Data:", formData);
    // Here you can send the formData to your API or backend
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Tracker Registration Form</p>

      <label className="textcenter">GPS form</label>

      {/* Device Name */}
      <label>
        <input
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          required
          className="input"
        />
        <span>Device Name:</span>
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
          <span>Brand</span>
        </label>

        {/* Model */}
        <label className="smallinputs">
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
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
              className="input"
            />
            <button
              type="button"
              onClick={() => handleRemoveRfidKey(index)}
              disabled={rfidKeys.length === 1} // Disable removal if it's the only input
              className="remove-rfid"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddRfidKey}
          className="submit-rfid"
        >
          Add RFID Key
        </button>
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit">
        Register Device
      </button>
    </form>
  );
};

export default RegisterGpsTrackerForm;
