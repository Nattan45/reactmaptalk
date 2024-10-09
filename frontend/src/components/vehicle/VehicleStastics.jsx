import React from "react";
import "./vehicles.css";
import ActiveVehicleStatus from "../activeStatusCards/ActiveVehicleStatus";
import { ActiveDriverStatus } from "../activeStatusCards/ActiveDriverStatus";
import InactivesVehicles from "../inactiveStatusCards/InactivesVehicles";
import InactiveDrivers from "../inactiveStatusCards/InactiveDrivers";

const VehicleStastics = () => {
  return (
    <div className="vehicleDriverConatiner">
      {/* actives vehicles */}
      <ActiveVehicleStatus />

      {/* inactives Vehicles */}
      <InactivesVehicles />

      {/* Active Drivers */}
      <ActiveDriverStatus />

      {/* inactive Drivers */}
      <InactiveDrivers />
    </div>
  );
};

export default VehicleStastics;
