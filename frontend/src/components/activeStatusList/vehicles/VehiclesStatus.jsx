import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Import this to access the location and its state

import ActiveVehicles from "./ActiveVehicles";
import InActiveVehicles from "./InActiveVehicles";
import AllVehiclesDataTable from "./AllVehiclesDataTable";
import PendingVehicles from "./PendingVehicles";

const VehiclesStatus = () => {
  const location = useLocation(); // Hook to get the current location and its state
  const inActiveVehiclesRef = useRef(null); // Ref to track the InactiveDevices section

  // Scroll to InactiveDevices when redirected with focusOnInactive state
  useEffect(() => {
    if (
      location.state &&
      location.state.focusOnInactive &&
      inActiveVehiclesRef.current
    ) {
      // Ensure that we scroll after the component renders
      setTimeout(() => {
        inActiveVehiclesRef.current.scrollIntoView({ behavior: "smooth" });
      }, 300); // Short delay to ensure the page is fully loaded
    }
  }, [location.state]);

  return (
    <div className="gridCenter">
      <div className="flexRowCenter">
        <ActiveVehicles />
        <div className="marginLeft">
          <InActiveVehicles />
        </div>
      </div>

      {/* <div className="marginTB"></div> */}

      {/* Add a ref to InActiveVehicles */}
      <div ref={inActiveVehiclesRef}>
        <PendingVehicles />
      </div>

      <div className="marginTB">
        <AllVehiclesDataTable />
      </div>
    </div>
  );
};

export default VehiclesStatus;
