import React, { useEffect, useState } from "react";
import "./tableStyle.css";

import Paginator from "../paginator/Paginator";
import Eseal from "../../data/Eseal";
import Button from "@mui/material/Button";

const InactiveDevices = () => {
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

  // **Filter the deviceData to show only "Active" devices**
  const inactiveDevices = deviceData.filter(
    (device) => device.status === "Inactive"
  );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inactiveDevices.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered data based on current page

  // Calculate the total number of pages for active devices
  const totalPages = Math.ceil(inactiveDevices.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  return (
    <div>
      <h2>
        <span>{inactiveDevices.length}</span> Inactive GPS Tracker Devices
      </h2>
      <table border="1" cellPadding="10" className="inactivedevicesTable">
        <thead className="inactivedevicesTable-header">
          <tr>
            <th>Device Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>RFID Keys</th>
            <th>Activate</th>
            <th>Edit Rfid</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((device) => (
              <tr key={device.id}>
                <td>{device.deviceName}</td>
                <td>{device.brand}</td>
                <td>{device.model}</td>
                <td>{device.rfidKeys.join(", ")}</td>
                <td>
                  <Button
                    variant="contained"
                    color="success"
                    className="smallbutton"
                  >
                    <span className="sentencebutton">Activate</span>
                  </Button>
                </td>
                <td>
                  {device.status === "Inactive" ? (
                    <Button
                      variant="contained"
                      color="success"
                      className="smallbutton"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-pencil"
                      >
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      &nbsp; &nbsp;
                      <span className="sentencebutton">Rfid</span>
                    </Button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No active devices available</td>
            </tr>
          )}
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

export default InactiveDevices;
