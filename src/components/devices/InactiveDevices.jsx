import React, { useEffect, useState } from "react";
import "./tableStyle.css";

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

  // Pagination control buttons with ellipses
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; // Show 3 page numbers before ellipses

    if (totalPages <= maxPagesToShow + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show the first page
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={currentPage === 1 ? "active" : ""}
        >
          1
        </button>
      );

      // Show ellipses if needed before the current page
      if (currentPage > maxPagesToShow) {
        pageNumbers.push(<span key="left-ellipsis">...</span>);
      }

      // Show middle page numbers (current and adjacent ones)
      const startPage = Math.max(2, currentPage - 1); // One before current page
      const endPage = Math.min(totalPages - 1, currentPage + 1); // One after current page

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }

      // Show ellipses if needed after the current page
      if (currentPage < totalPages - maxPagesToShow) {
        pageNumbers.push(<span key="right-ellipsis">...</span>);
      }

      // Always show the last page
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={currentPage === totalPages ? "active" : ""}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No active devices available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"} Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
};

export default InactiveDevices;
