import React, { useEffect, useState, useCallback } from "react";

import Paginator from "../../paginator/Paginator";
import axios from "axios";
import MessagePopup from "../../messageComponent/MessagePopup";
// import Button from "@mui/material/Button";

const InActiveVehicles = () => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  // Message Toast
  const [messages, setMessages] = useState([]);
  // Add Message
  const addMessage = (text, type) => {
    const id = Date.now(); // Unique ID based on timestamp
    setMessages((prevMessages) => [...prevMessages, { id, text, type }]);
  };
  // Remove Message
  const removeMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  const fetchData = useCallback(async () => {
    try {
      const Vehicles = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/vehicles`
      );

      setVehicleData(Vehicles.data); // Load the dummy data into state
    } catch (err) {
      if (err.response) {
        const errorMessage =
          err.response.data.errorMessage ||
          err.response.data.message ||
          "An error occurred: 500";
        addMessage(errorMessage, "error");
      } else {
        addMessage("Network error: Unable to reach the server.", "error");
      }
    }
  }, []);

  useEffect(() => {
    fetchData(); // Call the fetch function
  }, []);

  const InactiveVehicles = vehicleData.filter(
    (vehicle) => vehicle.vehicleStatus === "WAITING"
  );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = InactiveVehicles.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // Slice the data based on current page

  // Calculate the total number of pages
  const totalPages = Math.ceil(InactiveVehicles.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  // State to store the timestamp of the last refresh
  const [lastRefresh, setLastRefresh] = useState(0);

  const refreshBtn = () => {
    const now = Date.now();

    // Check if 10 seconds have passed since the last refresh
    if (now - lastRefresh >= 10000) {
      setCurrentPage(1); // Reset to the first page
      fetchData(); // Re-fetch the data
      addMessage("Refreshing ...", "success");

      // Update the last refresh timestamp
      setLastRefresh(now);
    }
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle inactiveColor">
        <div className="titleAndRefresh">
          <div className="titleLeft">
            {InactiveVehicles.length} Waiting Vehicles Status{" "}
          </div>
          <div className="refreshRight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-rotate-cw"
              onClick={refreshBtn}
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
          </div>
        </div>
      </h2>
      <table border="1" cellPadding="10" className="inactivedevicesTable">
        <thead className="inactivedevicesTable-header">
          <tr>
            <th>Vehicle Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Plate Number</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((vehicle, key) => (
              <tr key={key}>
                <td>{vehicle.vehicleName}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.plateNumber}</td>
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

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default InActiveVehicles;
