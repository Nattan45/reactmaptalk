import React, { useState } from "react";

import VehicleStastics from "./VehicleStastics";
import VehicleRegistration from "./VehicleRegistration";
import AllVehiclesDataTable from "./AllVehiclesDataTable";
import DriverRegistration from "../driver/DriverRegistration";
import UpdateDriverDetails from "../driver/UpdateDriverDetails";

const Vehicles = () => {
  // State to track which form is selected
  const [selectedForm, setSelectedForm] = useState("gps");

  // Handler for switching between forms
  const handleFormChange = (form) => {
    setSelectedForm(form);
  };

  return (
    <div className="devicesContainer">
      <div className="firstSection">
        <VehicleStastics />
      </div>

      {/* Navigation section */}
      <div className="deviceChoice">
        <nav className="formNav">
          {/* Buttons for selecting the form */}
          <button
            className={selectedForm === "vehicleRegistration" ? "active" : ""}
            onClick={() => handleFormChange("vehicleRegistration")}
          >
            Vehicle Registration
          </button>
          <button
            className={selectedForm === "DriverRegistration" ? "active" : ""}
            onClick={() => handleFormChange("DriverRegistration")}
          >
            Driver Registration
          </button>
          <button
            className={selectedForm === "UpdateDriverDetails" ? "active" : ""}
            onClick={() => handleFormChange("UpdateDriverDetails")}
          >
            Update Driver
          </button>
          {/* <button
            className={selectedForm === "ActiveGPS" ? "active" : ""}
            onClick={() => handleFormChange("ActiveGPS")}
          >
            Active Vehicles
          </button> */}
          {/* <button
            className={selectedForm === "InactiveGPS" ? "active" : ""}
            onClick={() => handleFormChange("InactiveGPS")}
          >
            Inactive Vehicles
          </button> */}
          {/* <button
            className={selectedForm === "InactiveGPS" ? "active" : ""}
            onClick={() => handleFormChange("InactiveGPS")}
          >
            Active Drivers
          </button> */}
          {/* <button
            className={selectedForm === "InactiveGPS" ? "active" : ""}
            onClick={() => handleFormChange("InactiveGPS")}
          >
            Inactive Drivers
          </button> */}
        </nav>

        {/* Conditionally render the form based on user choice */}
        <div className="formContainer">
          {selectedForm === "vehicleRegistration" && <VehicleRegistration />}
          {selectedForm === "DriverRegistration" && <DriverRegistration />}
          {selectedForm === "UpdateDriverDetails" && <UpdateDriverDetails />}
          {/* {selectedForm === "ActiveGPS" && <ActiveDevices />} */}
          {/* {selectedForm === "InactiveGPS" && <InactiveDevices />} */}
        </div>
      </div>

      <div className="thirdSection">
        <AllVehiclesDataTable />
      </div>
    </div>
  );
};

export default Vehicles;
