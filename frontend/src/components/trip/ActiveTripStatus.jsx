import React from "react";

import ActiveVehicleStatus from "../activeStatusCards/ActiveVehicleStatus";
import { ActiveDriverStatus } from "../activeStatusCards/ActiveDriverStatus";
import ActiveRoadStatus from "../activeStatusCards/ActiveRoadStatus";
import ActiveGpsTrackers from "../activeStatusCards/ActiveGpsTrackers";
import UpcommingCheckpointsStatus from "../activeStatusCards/UpcommingCheckpointsStatus";

const ActiveTripStatus = () => {
  return (
    <div className="StatusCardContainer">
      <div className="fiveCardRowContainer">
        <ActiveVehicleStatus />
        <ActiveDriverStatus />
        <ActiveGpsTrackers />
        <ActiveRoadStatus />
        <UpcommingCheckpointsStatus />
      </div>
    </div>
  );
};

export default ActiveTripStatus;
