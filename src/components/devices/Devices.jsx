import React, { useState } from "react";

import "./devices.css";
import DeviceStastics from "./DeviceStastics";
import RegisterGpsTrackerForm from "./RegisterGpsTrackerForm ";
import GpsTrackerTable from "./GpsTrackerTable";
import RegisterFridForm from "./RegisterFridForm";
import ActiveDevices from "./ActiveDevices";
import InactiveDevices from "./InactiveDevices";

const Devices = () => {
  // State to track which form is selected
  const [selectedForm, setSelectedForm] = useState("gps");

  // Handler for switching between forms
  const handleFormChange = (form) => {
    setSelectedForm(form);
  };

  return (
    <div className="devicesContainer">
      <div className="firstSection">
        <DeviceStastics />
      </div>
      {/* Navigation section */}
      <div className="deviceChoice">
        <nav className="formNav">
          {/* Buttons for selecting the form */}
          <button
            className={selectedForm === "gps" ? "active" : ""}
            onClick={() => handleFormChange("gps")}
          >
            Register GPS Tracker
          </button>
          <button
            className={selectedForm === "rfid" ? "active" : ""}
            onClick={() => handleFormChange("rfid")}
          >
            Register RFID
          </button>
          <button
            className={selectedForm === "ActiveGPS" ? "active" : ""}
            onClick={() => handleFormChange("ActiveGPS")}
          >
            Active GPS
          </button>
          <button
            className={selectedForm === "InactiveGPS" ? "active" : ""}
            onClick={() => handleFormChange("InactiveGPS")}
          >
            Inactive GPS
          </button>
        </nav>

        {/* Conditionally render the form based on user choice */}
        <div className="formContainer">
          {selectedForm === "gps" && <RegisterGpsTrackerForm />}
          {selectedForm === "rfid" && <RegisterFridForm />}
          {selectedForm === "ActiveGPS" && <ActiveDevices />}
          {selectedForm === "InactiveGPS" && <InactiveDevices />}
        </div>
      </div>

      <div className="secondSection"></div>
      <div className="thirdSection">
        <GpsTrackerTable />
      </div>
    </div>
  );
};

export default Devices;
