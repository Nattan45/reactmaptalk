import React, { useEffect, useState } from "react";

import Paginator from "../paginator/Paginator";
import Vehicles from "../../data/Vehicles"; // Importing dummy data
// import Button from "@mui/material/Button";

const ActiveVehicles = () => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setVehicleData(Vehicles); // Load the dummy data into state
    };

    fetchData(); // Call the fetch function
  }, []);

  const activeVehicles = vehicleData.filter((item) => item.status === "Active");

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
      <h2 className="tableDataHeaderTitle">
        All {activeVehicles.length} Active Vehicles Status
      </h2>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>Vehicle Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Plate Number</th>
            <th>Status</th>
            <th>Driver ID</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((device) => (
              <tr key={device.id}>
                <td>{device.vehicleName}</td>
                <td>{device.brand}</td>
                <td>{device.model}</td>
                <td>{device.plateNumber}</td>
                <td>{device.status}</td>
                <td>{device.status === "Active" ? device.driverId : ""}</td>
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

export default ActiveVehicles;
