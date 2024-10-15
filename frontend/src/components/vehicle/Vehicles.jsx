import React, { useState } from "react";

import VehicleStastics from "./VehicleStastics";
import VehicleRegistration from "./VehicleRegistration";
import AllVehiclesDataTable from "../activeStatusList/vehicles/AllVehiclesDataTable";
import DriverRegistration from "../driver/DriverRegistration";
import UpdateDriverDetails from "../driver/UpdateDriverDetails";
import ActiveDrivers from "../activeStatusList/drivers/ActiveDrivers";
import InactiveDrivers from "../activeStatusList/drivers/InactiveDrivers";
import UpdateVehicleDetails from "./UpdateVehicleDetails";
import ActiveVehicles from "../activeStatusList/vehicles/ActiveVehicles";
import InActiveVehicles from "../activeStatusList/vehicles/InActiveVehicles";
import PendingVehicles from "../activeStatusList/vehicles/PendingVehicles";

const Vehicles = () => {
  // State to track which form is selected
  const [selectedForm, setSelectedForm] = useState("vehicleRegistration");

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
          {/* left side Buttons */}
          <div className="leftSide">
            <button
              className={selectedForm === "vehicleRegistration" ? "active" : ""}
              onClick={() => handleFormChange("vehicleRegistration")}
            >
              Vehicle Registration
            </button>
            <button
              className={
                selectedForm === "UpdateVehicleDetails" ? "active" : ""
              }
              onClick={() => handleFormChange("UpdateVehicleDetails")}
            >
              Update Vehicle
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
          </div>

          {/* breaker line */}
          <hr />

          {/* right side Buttons */}
          <div className="rightSide">
            <button
              className={selectedForm === "ActiveVehicles" ? "active" : ""}
              onClick={() => handleFormChange("ActiveVehicles")}
            >
              Active Vehicles
            </button>
            <button
              className={selectedForm === "PendingVehicles" ? "active" : ""}
              onClick={() => handleFormChange("PendingVehicles")}
            >
              Pending Vehicles
            </button>
            <button
              className={selectedForm === "WaitingVehicles" ? "active" : ""}
              onClick={() => handleFormChange("WaitingVehicles")}
            >
              Waiting Vehicles
            </button>
            <button
              className={selectedForm === "ActiveDrivers" ? "active" : ""}
              onClick={() => handleFormChange("ActiveDrivers")}
            >
              Active Drivers
            </button>
            <button
              className={selectedForm === "InactiveDrivers" ? "active" : ""}
              onClick={() => handleFormChange("InactiveDrivers")}
            >
              Inactive Drivers
            </button>
          </div>
        </nav>

        {/* Conditionally render the form based on user choice */}
        <div className="formContainer">
          {selectedForm === "vehicleRegistration" && <VehicleRegistration />}
          {selectedForm === "UpdateVehicleDetails" && <UpdateVehicleDetails />}
          {selectedForm === "DriverRegistration" && <DriverRegistration />}
          {selectedForm === "UpdateDriverDetails" && <UpdateDriverDetails />}
          {selectedForm === "ActiveVehicles" && <ActiveVehicles />}
          {selectedForm === "PendingVehicles" && <PendingVehicles />}
          {selectedForm === "WaitingVehicles" && <InActiveVehicles />}
          {selectedForm === "ActiveDrivers" && <ActiveDrivers />}
          {selectedForm === "InactiveDrivers" && <InactiveDrivers />}
        </div>
      </div>

      <div className="thirdSection">
        <AllVehiclesDataTable />
      </div>
    </div>
  );
};

export default Vehicles;
