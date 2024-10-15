import React, { useEffect, useState } from "react";

import Paginator from "../../paginator/Paginator";
import axios from "axios";
import MessagePopup from "../../messageComponent/MessagePopup";
// import Button from "@mui/material/Button";

const ActiveVehicles = () => {
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

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData(); // Call the fetch function
  }, []);

  const activeVehicles = vehicleData.filter(
    (vehicle) => vehicle.vehicleStatus === "ASSIGNED"
  );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeVehicles.slice(indexOfFirstItem, indexOfLastItem); // Slice the data based on current page

  // Calculate the total number of pages
  const totalPages = Math.ceil(activeVehicles.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle activeColor">
        {activeVehicles.length} Active Vehicles Status
      </h2>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>Vehicle Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Plate Number</th>
            <th>Driver ID</th>
            <th>Road Number</th>
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
                <td>
                  {vehicle.vehicleStatus === "ASSIGNED" ? vehicle.driverId : ""}
                </td>
                <td>
                  {vehicle.vehicleStatus === "ASSIGNED"
                    ? vehicle.roadNumber
                    : ""}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
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

export default ActiveVehicles;
