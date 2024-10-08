import React, { useEffect, useState } from "react";

import Drivers from "../../../data/Drivers";
import Paginator from "../../paginator/Paginator";

const AllDriversList = () => {
  const [driverData, setDriverData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setDriverData(Drivers); // Load the dummy data into state
    };

    fetchData(); // Call the fetch function
  }, []);

  const allDrivers = driverData;

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allDrivers.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered data based on current page

  const totalPages = Math.ceil(allDrivers.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle">
        <span></span> All Drivers
      </h2>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>Driver Name</th>
            <th>Driver ID</th>
            <th>Phone Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((driver) => (
                <tr key={driver.id}>
                  <td>
                    {driver.firstName}&nbsp;{driver.lastName}
                  </td>
                  <td>{driver.driverId}</td>
                  <td>{driver.phoneNumber}</td>
                  <td>{driver.status}</td>
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
export default AllDriversList;
