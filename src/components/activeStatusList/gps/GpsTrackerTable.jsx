import React, { useEffect, useState } from "react";

import Paginator from "../../paginator/Paginator";
import Eseal from "../../../data/Eseal"; // Importing dummy data
// import Button from "@mui/material/Button";

const GpsTrackerTable = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setDeviceData(Eseal); // Load the dummy data into state
    };

    fetchData(); // Call the fetch function
  }, []);

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deviceData.slice(indexOfFirstItem, indexOfLastItem); // Slice the data based on current page

  // Calculate the total number of pages
  const totalPages = Math.ceil(deviceData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle">
        All {deviceData.length} GPS Tracker Devices Status
      </h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Brand</th>
            <th>GPS ID</th>
            <th>RFID Keys</th>
            <th>Status</th>
            <th>Vehicle</th>
            <th>Speed</th>
            <th>Installation Date</th>
            <th>Battery</th>
            {/* <th>Operations</th> */}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((device) => (
              <tr key={device.id}>
                <td>{device.deviceName}</td>
                <td>{device.brand}</td>
                <td>{device.gpsId}</td>
                <td>
                  <div className="flexList">
                    {device.rfidKeys.map((rfid, idx) => (
                      <button key={idx} className=" itemCenter">
                        {rfid.RfidKey}
                      </button>
                    ))}
                  </div>
                </td>
                <td>{device.status}</td>
                <td>{device.status === "Active" ? device.vehicle : ""}</td>
                <td>{device.speed}</td>
                <td>{device.InstallationDate}</td>
                <td>{device.BatteryLevel}</td>
                {/* <td>
                  {device.status === "Inactive" ? (
                    <Button
                      variant="contained"
                      color="error"
                      className="smallbutton"
                    >
                      &nbsp; &nbsp;
                      <span className="sentencebutton">Delete</span>
                    </Button>
                  ) : (
                    ""
                  )}
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GpsTrackerTable;
