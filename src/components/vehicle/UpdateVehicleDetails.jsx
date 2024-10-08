import React, { useEffect, useState } from "react";

import Paginator from "../paginator/Paginator";
import Vehicles from "../../data/Vehicles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const UpdateVehicleDetails = () => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [editVehicle, setEditVehicle] = useState(null); // State for the Vehicle to be edited
  const [open, setOpen] = useState(false); // Modal open state
  const [filterText, setFilterText] = useState(""); // State for filtering plate numbers

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setVehicleData(Vehicles); // Load the dummy data into state
    };

    fetchData(); // Call the fetch function
  }, []);

  // filter
  const inactiveVehicles = vehicleData
    .filter((item) => item.status === "Inactive")
    .filter((item) =>
      item.plateNumber.toLowerCase().includes(filterText.toLowerCase())
    );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inactiveVehicles.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // Slice the data based on current page

  // Calculate the total number of pages
  const totalPages = Math.ceil(inactiveVehicles.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  // popups
  // Function to handle modal open
  const handleEditClick = (vehicle) => {
    setEditVehicle(vehicle);
    setOpen(true);
  };

  // Function to handle modal close
  const handleClose = () => {
    setOpen(false);
    setEditVehicle(null);
  };

  const handleUpdate = (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Log the updated driver details using the name attributes
    const updatedVehicle = {
      vehicleName: event.target.elements.vehicleName.value,
      brand: event.target.elements.brand.value,
      model: event.target.elements.model.value,
      plateNumber: event.target.elements.plateNumber.value,
    };

    console.log("Updated Vehicle Details:", updatedVehicle);
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
      <h2 className="tableDataHeaderTitle">Inactive Vehicles Update Form</h2>
      <div className="filters">
        <input
          placeholder="Plate Number..."
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
            <th>Vehicle Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Plate Number</th>
            <th>Status</th>
            <th>Ops</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.vehicleName}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.plateNumber}</td>
                  <td>{vehicle.status}</td>
                  <td>
                    <Stack direction="row" spacing={2}>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color={
                            vehicle.status === "Active"
                              ? "inactivebtn"
                              : "error"
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
                            vehicle.status === "Active" ? "hide" : "show"
                          }`}
                          onClick={() => handleEditClick(vehicle)}
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

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Modal open={open} onClose={handleClose}>
        <Box className="modalBox">
          {editVehicle && (
            <div>
              <h3>
                Edit Vehicle: {editVehicle.vehicleName} {editVehicle.model}
              </h3>
              <form className="form heightfit" onSubmit={handleUpdate}>
                <label>
                  Vehicle Name:
                  <input
                    type="text"
                    defaultValue={editVehicle.vehicleName}
                    name="vehicleName"
                    className="input"
                  />
                </label>
                <label>
                  Brand
                  <input
                    type="text"
                    defaultValue={editVehicle.brand}
                    name="brand"
                    className="input"
                  />
                </label>
                <label>
                  Model
                  <input
                    type="text"
                    defaultValue={editVehicle.model}
                    name="model"
                    className="input"
                  />
                </label>
                <label>
                  Plate Number
                  <input
                    type="text"
                    defaultValue={editVehicle.plateNumber}
                    name="plateNumber"
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

export default UpdateVehicleDetails;
