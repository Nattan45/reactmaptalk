import React from "react";
import ActiveDevices from "./ActiveDevices";
import InactiveDevices from "./InactiveDevices";
import GpsTrackerTable from "./GpsTrackerTable";

const DevicesStatus = () => {
  return (
    <div className="gridCenter">
      <div className="marginTB">
        <ActiveDevices />
      </div>
      <InactiveDevices />
      <div className="marginTB">
        <GpsTrackerTable />
      </div>
    </div>
  );
};

export default DevicesStatus;
