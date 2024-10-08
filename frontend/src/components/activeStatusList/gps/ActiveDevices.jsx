import React, { useEffect, useState } from "react";

import Paginator from "../../paginator/Paginator";
import Eseal from "../../../data/Eseal";
import Button from "@mui/material/Button";

const ActiveDevices = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [filterText, setFilterText] = useState(""); // State for filtering plate numbers

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setDeviceData(Eseal); // Load the dummy data into state
    };

    fetchData(); // Call the fetch function
  }, []);

  // **Filter the deviceData to show only "Active" devices**
  // const activeDevices = deviceData.filter(
  //   (device) => device.status === "Active"
  // );

  const activeDevices = deviceData
    .filter((item) => item.status === "Active")
    .filter((item) =>
      (item.vehicle || "").toLowerCase().includes(filterText.toLowerCase())
    );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeDevices.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered data based on current page

  // Calculate the total number of pages for active devices
  const totalPages = Math.ceil(activeDevices.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle activeColor">
        <span>{activeDevices.length}</span> Active GPS Tracker Devices
      </h2>
      <div className="filters nomarginTop">
        <input
          placeholder="Plate Number..."
          type="text"
          name="text"
          className="inputFilter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        ></input>
      </div>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>Device Name</th>
            <th>Brand</th>
            <th>Gps Id</th>
            <th>RFID Keys</th>
            <th>Vehicle</th>
            <th>Speed</th>
            <th>Installation Date</th>
            <th>Battery</th>
            <th>Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((device) => (
                <tr key={device.id}>
                  <td>{device.deviceName}</td>
                  <td>{device.brand}</td>
                  <td>{device.gpsId}</td>
                  <td>
                    <div className="flexList">
                      {device.rfidKeys.map((rfid, idx) => (
                        <button key={idx} className="itemCenter">
                          {rfid.RfidKey}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td>{device.vehicle}</td>
                  <td>{device.speed}</td>
                  <td>{device.InstallationDate}</td>
                  <td>{device.BatteryLevel}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      className="smallbutton"
                    >
                      <span className="sentencebutton">Deactivate</span>
                    </Button>
                  </td>
                </tr>
              ))
            : null}
          {/* No need to display "No active devices available" */}
        </tbody>
      </table>

      {/* Using the Paginator component */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ActiveDevices;
