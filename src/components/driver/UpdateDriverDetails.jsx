import React, { useEffect, useState } from "react";

import "./driver.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Paginator from "../paginator/Paginator";
import Drivers from "../../data/Drivers";
import Button from "@mui/material/Button";

const UpdateDriverDetails = () => {
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
      <h2>
        <span></span> All Drivers
      </h2>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>Driver Name</th>
            <th>Driver ID</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Ops</th>
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
                  <td>
                    <Stack direction="row" spacing={2}>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color={
                            driver.status === "Active" ? "inactivebtn" : "error"
                          } // Conditionally change button color
                          className="smallbutton"
                        >
                          <span className="sentencebutton">Delete</span>
                        </Button>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-file-pen"
                          className={
                            driver.status === "Active" ? "show" : "hide"
                          }
                        >
                          <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" />
                          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                          <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                        </svg>
                      </ThemeProvider>
                    </Stack>
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

export default UpdateDriverDetails;
