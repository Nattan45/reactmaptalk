import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Import this to access the location and its state

import ActiveDrivers from "./ActiveDrivers";
import FreeDrivers from "./FreeDrivers";
// import AllDriversList from "./AllDriversList";
import UpdateDriverDetails from "../../driver/UpdateDriverDetails";

const DriverStatus = () => {
  const location = useLocation(); // Hook to get the current location and its state
  const freeDriversRef = useRef(null); // Ref to track the InactiveDevices section

  // Scroll to InactiveDevices when redirected with focusOnInactive state
  useEffect(() => {
    if (
      location.state &&
      location.state.focusOnInactive &&
      freeDriversRef.current
    ) {
      // Ensure that we scroll after the component renders
      setTimeout(() => {
        freeDriversRef.current.scrollIntoView({ behavior: "smooth" });
      }, 300); // Short delay to ensure the page is fully loaded
    }
  }, [location.state]);

  return (
    // <div className="gridCenter">
    //   <div className="marginTB">
    //     <ActiveDrivers />
    //   </div>

    //   {/* Add a ref to FreeDrivers */}
    //   <div ref={freeDriversRef}>
    //     <FreeDrivers />
    //   </div>

    //   <div className="marginTB">
    //     <AllDriversList />
    //   </div>
    // </div>
    <div className="gridJustifyCenter">
      <div className="flexRowCenter">
        <ActiveDrivers />
        <div className="marginLeft">
          <FreeDrivers />
        </div>
      </div>
      <div className="fitWidth">
        <UpdateDriverDetails />
      </div>
    </div>
  );
};
export default DriverStatus;
