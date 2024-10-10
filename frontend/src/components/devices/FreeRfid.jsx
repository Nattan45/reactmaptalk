import React, { useEffect, useState } from "react";
import "./tableStyle.css";

import Paginator from "../paginator/Paginator";
import FreeRfids from "../../data/FreeRfids";
import Button from "@mui/material/Button";

const FreeRfid = () => {
  const [FreeRfidsData, setFreeRfidsData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setFreeRfidsData(FreeRfids); // Load the dummy data into state
    };

    fetchData(); // Call the fetch function
  }, []);

  // **Filter the deviceData to show only "Active" devices**
  const inactiveFreeRfids = FreeRfidsData.filter(
    (item) => item.status === "Free"
  );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inactiveFreeRfids.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // Slice the filtered data based on current page

  // Calculate the total number of pages for FreeRfids
  const totalPages = Math.ceil(inactiveFreeRfids.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle">
        <span>{inactiveFreeRfids.length}</span> Free Rfid Keys
      </h2>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>RFID Keys</th>
            <th>Status</th>
            <th>Tag Type</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((Rfids) => (
                <tr key={Rfids.id}>
                  <td>{Rfids.RfidKey}</td>
                  <td>{Rfids.status}</td>
                  <td>{Rfids.tagType}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      className="smallbutton"
                    >
                      <span className="sentencebutton">Delete</span>
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

export default FreeRfid;
