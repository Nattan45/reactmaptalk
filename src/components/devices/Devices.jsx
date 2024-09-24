import React from "react";
import "./devices.css";
import DeviceStastics from "./DeviceStastics";
import RegisterGpsTrackerForm from "./RegisterGpsTrackerForm ";
import GpsTrackerTable from "./GpsTrackerTable";
import RegisterFridForm from "./RegisterFridForm";
import ActiveDevices from "./ActiveDevices";
import InactiveDevices from "./InactiveDevices";

const Devices = () => {
  return (
    <div className="devicesContainer">
      <div className="firstSection">
        <DeviceStastics />
      </div>
      <div className="secondSection">
        <RegisterGpsTrackerForm />
        <RegisterFridForm />
        <ActiveDevices />
        <InactiveDevices />
      </div>
      <div className="thirdSection">
        <GpsTrackerTable />
      </div>
    </div>
  );
};

export default Devices;
