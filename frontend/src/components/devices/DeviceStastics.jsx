import React from "react";
import ActiveGpsTrackers from "../activeStatusCards/ActiveGpsTrackers";
import ActiveVehicleStatus from "../activeStatusCards/ActiveVehicleStatus";
import InActiveGpsTrackers from "../inactiveStatusCards/InActiveGpsTrackers";

const DeviceStastics = () => {
  return (
    <div className="DeviceStasticsContainer">
      {/* actives Gps trackers / E-seal */}
      <ActiveGpsTrackers />

      {/* inactives */}
      <InActiveGpsTrackers />

      {/* Active Vehicles */}
      <ActiveVehicleStatus />
    </div>
  );
};

export default DeviceStastics;
