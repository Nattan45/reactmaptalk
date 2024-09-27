import React, { useEffect, useState } from "react";

import Paginator from "../paginator/Paginator";
import Drivers from "../../data/Drivers";

const ActiveDrivers = () => {
  const [ActiveDriversData, setActiveDriversData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setActiveDriversData(Drivers); // Load the dummy data into state
    };

    fetchData(); // Call the fetch function
  }, []);

  // **Filter the driver to show only "Active" devices**
  const inactiveActiveDrivers = ActiveDriversData.filter(
    (item) => item.status === "Active"
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

  return (
    <div>
      <h2 className="tableDataHeaderTitle">
        <span>{inactiveActiveDrivers.length}</span> Free Drivers
      </h2>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>Driver Name</th>
            <th>Driver ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((Driver) => (
                <tr key={Driver.id}>
                  <td>
                    {Driver.firstName}&nbsp;
                    {Driver.lastName}
                  </td>
                  <td>{Driver.driverId}</td>
                  <td>{Driver.status}</td>
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
    </div>
  );
};

export default ActiveDrivers;
