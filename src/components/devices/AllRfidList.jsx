import React, { useEffect, useState } from "react";
import "./tableStyle.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paginator from "../paginator/Paginator";
import FreeRfids from "../../data/FreeRfids";
import Button from "@mui/material/Button";

const AllRfidList = () => {
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
  const allFreeRfids = FreeRfidsData;

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allFreeRfids.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered data based on current page

  // Calculate the total number of pages for FreeRfids
  const totalPages = Math.ceil(allFreeRfids.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      inactivebtn: createColor("#ccc"),
      apple: createColor("#5DBA40"),
    },
  });

  return (
    <div>
      <h2 className="tableDataHeaderTitle">
        <span></span> All Rfid Keys
      </h2>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>RFID Keys</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((Rfids) => (
                <tr key={Rfids.id}>
                  <td>{Rfids.RfidKey}</td>
                  <td>{Rfids.status}</td>
                  <td>
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        color={
                          Rfids.status === "occupied" ? "inactivebtn" : "error"
                        } // Conditionally change button color
                        className="smallbutton"
                      >
                        <span className="sentencebutton">Delete</span>
                      </Button>
                    </ThemeProvider>
                  </td>
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

export default AllRfidList;
