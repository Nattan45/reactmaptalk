import React, { useEffect, useState, useCallback } from "react";

import Paginator from "../../paginator/Paginator";
import axios from "axios";
import MessagePopup from "../../messageComponent/MessagePopup";

const ActiveDrivers = () => {
  const [ActiveDriversData, setActiveDriversData] = useState([]); // State for the full data
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

  // Wrap fetchData in useCallback to memoize it
  const fetchData = useCallback(async () => {
    try {
      const Drivers = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/drivers`
      );

      setActiveDriversData(Drivers.data);
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
  }, []); // Empty dependency array ensures fetchData is created only once

  useEffect(() => {
    fetchData();
  }, []);

  // **Filter the driver to show only "Active" devices**
  const inactiveActiveDrivers = ActiveDriversData.filter(
    (driver) => driver.driverStatus === "ACTIVE"
  );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inactiveActiveDrivers.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // Slice the filtered data based on current page

  const totalPages = Math.ceil(inactiveActiveDrivers.length / itemsPerPage);

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
      <h2 className="tableDataHeaderTitle activeColor">
        <div className="titleAndRefresh">
          <div className="titleLeft">
            <span>{inactiveActiveDrivers.length}</span> Active Drivers
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
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>Driver Name</th>
            <th>Driver ID</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((Driver, key) => (
                <tr key={key}>
                  <td>
                    {Driver.firstName}&nbsp;
                    {Driver.lastName}
                  </td>
                  <td>{Driver.driverId}</td>
                  <td>{Driver.email}</td>
                  <td>{Driver.phoneNumber}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      {/* Using the Paginator component */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default ActiveDrivers;
