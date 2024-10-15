import React from "react";
import "./vehicles.css";
import ActiveVehicleStatus from "../activeStatusCards/ActiveVehicleStatus";
import { ActiveDriverStatus } from "../activeStatusCards/ActiveDriverStatus";
import InactivesVehicles from "../inactiveStatusCards/InactivesVehicles";
import InactiveDrivers from "../inactiveStatusCards/InactiveDrivers";
import PendingsVehicles from "../inactiveStatusCards/PendingsVehicles";

const VehicleStastics = () => {
  return (
    // <div className="vehicleDriverConatiner">
    <div className="StatusCardContainer">
      <div className="fiveCardRowContainer">
        {/* actives vehicles */}
        <ActiveVehicleStatus />

        {/* inactives Vehicles */}
        <InactivesVehicles />

        {/* Pending Vehicles */}
        <PendingsVehicles />

        {/* Active Drivers */}
        <ActiveDriverStatus />

        {/* inactive Drivers */}
        <InactiveDrivers />
      </div>
    </div>
  );
};

export default VehicleStastics;
