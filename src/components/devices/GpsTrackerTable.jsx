import React, { useEffect, useState } from "react";

import Paginator from "../paginator/Paginator";
import Eseal from "../../data/Eseal"; // Importing dummy data
import Button from "@mui/material/Button";

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
      <h2>All GPS Tracker Devices</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>RFID Keys</th>
            <th>Status</th>
            <th>Vehicle</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((device) => (
              <tr key={device.id}>
                <td>{device.deviceName}</td>
                <td>{device.brand}</td>
                <td>{device.model}</td>
                <td className="">{device.rfidKeys.join(", ")}</td>
                <td>{device.status}</td>
                <td>{device.status === "Active" ? device.vehicle : ""}</td>
                <td>
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

                  {device.status === "Active" ? (
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
