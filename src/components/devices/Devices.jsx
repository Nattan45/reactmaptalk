import React from "react";
import "./devices.css";
import DeviceStastics from "./DeviceStastics";
import RegisterGpsTrackerForm from "./RegisterGpsTrackerForm ";
import GpsTrackerTable from "./GpsTrackerTable";
import RegisterFridForm from "./RegisterFridForm";

const Devices = () => {
  return (
    <div className="devicesContainer">
      <div className="firstSection">
        <DeviceStastics />
      </div>
      <div className="secondSection">
        <RegisterGpsTrackerForm />
        <RegisterFridForm />
        <h1>active devices</h1>
        <h1>inactive devices</h1>
      </div>
      <div className="thirdSection">
        <GpsTrackerTable />
      </div>
    </div>
  );
};

export default Devices;
