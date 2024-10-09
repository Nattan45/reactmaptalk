import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Import this to access the location and its state

import ActiveDevices from "./ActiveDevices";
import InactiveDevices from "./InactiveDevices";
import GpsTrackerTable from "./GpsTrackerTable";

const DevicesStatus = () => {
  const location = useLocation(); // Hook to get the current location and its state
  const inactiveDevicesRef = useRef(null); // Ref to track the InactiveDevices section

  // Scroll to InactiveDevices when redirected with focusOnInactive state
  useEffect(() => {
    if (
      location.state &&
      location.state.focusOnInactive &&
      inactiveDevicesRef.current
    ) {
      // Ensure that we scroll after the component renders
      setTimeout(() => {
        inactiveDevicesRef.current.scrollIntoView({ behavior: "smooth" });
      }, 300); // Short delay to ensure the page is fully loaded
    }
  }, [location.state]);

  return (
    <div className="gridCenter">
      <div className="marginTB">
        <ActiveDevices />
      </div>

      {/* Add a ref to InactiveDevices */}
      <div ref={inactiveDevicesRef}>
        <InactiveDevices />
      </div>

      <div className="marginTB">
        <GpsTrackerTable />
      </div>
    </div>
  );
};

export default DevicesStatus;
