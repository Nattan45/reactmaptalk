import React, { useEffect, useState } from "react";

import "./driver.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Paginator from "../paginator/Paginator";
import Drivers from "../../data/Drivers";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const UpdateDriverDetails = () => {
  const [driverData, setDriverData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [editDriver, setEditDriver] = useState(null); // State for the driver to be edited
  const [open, setOpen] = useState(false); // Modal open state
  const [filterText, setFilterText] = useState(""); // State for filtering plate numbers

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setDriverData(Drivers); // Load the dummy data into state
    };

    fetchData(); // Call the fetch function
  }, []);

  const allDrivers = driverData;

  // Apply filter based on filterText (name, ID, phone number, or email)
  const filteredDrivers = allDrivers.filter((driver) => {
    const fullName = `${driver.firstName} ${driver.lastName}`.toLowerCase();
    const id = driver.driverId.toLowerCase();
    const phone = driver.phoneNumber.toLowerCase();
    const email = driver.email.toLowerCase();
    const filter = filterText.toLowerCase();

    return (
      fullName.includes(filter) ||
      id.includes(filter) ||
      phone.includes(filter) ||
      email.includes(filter)
    );
  });

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDrivers.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered data based on current page

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  // popups
  // Function to handle modal open
  const handleEditClick = (driver) => {
    setEditDriver(driver);
    setOpen(true);
  };

  // Function to handle modal close
  const handleClose = () => {
    setOpen(false);
    setEditDriver(null);
  };

  const handleUpdate = (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Log the updated driver details using the name attributes
    const updatedDriver = {
      driverName: event.target.elements.driverName.value,
      driverId: event.target.elements.driverId.value,
      phoneNumber: event.target.elements.phoneNumber.value,
      email: event.target.elements.email.value,
      emergencyContact: event.target.elements.emergencyContact.value,
    };

    console.log("Updated Driver Details:", updatedDriver);
    handleClose(); // Close the modal after saving or updating
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
    <div className={open ? "blur-background" : ""}>
      <h2 className="tableDataHeaderTitle">
        <span></span> All Drivers
      </h2>

      <div className="filters">
        <input
          placeholder="Name, ID, phone, email ..."
          type="text"
          name="text"
          className="inputFilter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        ></input>
      </div>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>Driver Name</th>
            <th>Driver ID</th>
            <th>Phone Number</th>
            <th>Email</th>
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
                  <td>{driver.email}</td>
                  <td>{driver.status}</td>
                  <td>
                    <Stack direction="row" spacing={2}>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color={
                            driver.status === "Active" ? "inactivebtn" : "error"
                          }
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
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`lucide lucide-file-pen ${
                            driver.status === "Active" ? "hide" : "show"
                          }`}
                          onClick={() => handleEditClick(driver)}
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

      {/* Modal for editing driver details */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modalBox">
          {editDriver && (
            <div>
              <h3>
                Edit Driver: {editDriver.firstName} {editDriver.lastName}
              </h3>
              <form className="form heightfit" onSubmit={handleUpdate}>
                <label>
                  Driver Name:
                  <input
                    type="text"
                    defaultValue={editDriver.driverName}
                    name="driverName"
                    className="input"
                  />
                </label>
                <label>
                  Driver ID
                  <input
                    type="text"
                    defaultValue={editDriver.driverId}
                    name="driverId"
                    className="input"
                  />
                </label>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    defaultValue={editDriver.phoneNumber}
                    name="phoneNumber"
                    className="input"
                  />
                </label>
                <label>
                  Email
                  <input
                    type="text"
                    defaultValue={editDriver.email}
                    name="email"
                    className="input"
                  />
                </label>
                <label>
                  Emergency Contact
                  <input
                    type="text"
                    defaultValue={editDriver.emergencyContact}
                    name="emergencyContact"
                    className="input"
                  />
                </label>
                <button type="submit" className="submit">
                  Save
                </button>
              </form>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateDriverDetails;
