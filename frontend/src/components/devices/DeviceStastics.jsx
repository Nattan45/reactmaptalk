import React from "react";
import ActiveGpsTrackers from "../activeStatusCards/ActiveGpsTrackers";
import ActiveVehicleStatus from "../activeStatusCards/ActiveVehicleStatus";
import InActiveGpsTrackers from "../inactiveStatusCards/InActiveGpsTrackers";
import AssignedRfidsStatus from "../activeStatusCards/AssignedRfidsStatus";
import UnassignedRfidsStatus from "../inactiveStatusCards/UnassignedRfidsStatus";

const DeviceStastics = () => {
  return (
    <div className="DeviceStasticsContainer">
      {/* actives Gps trackers / E-seal */}
      <ActiveGpsTrackers />

      {/* inactives */}
      <InActiveGpsTrackers />

      {/* Active Vehicles */}
      <ActiveVehicleStatus />

      {/* Assigned Rfids */}
      <AssignedRfidsStatus />

      {/* Unassigned Rfids */}
      <UnassignedRfidsStatus />
    </div>
  );
};

export default DeviceStastics;
