import React, { useCallback, useEffect, useState } from "react";

import Paginator from "../paginator/Paginator";
import {
  Stack,
  Modal,
  TextField,
  Button,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import MessagePopup from "../messageComponent/MessagePopup";

const UpdateVehicleDetails = () => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [editVehicle, setEditVehicle] = useState(null); // State for the Vehicle to be edited
  const [open, setOpen] = useState(false); // Modal open state
  const [filterText, setFilterText] = useState(""); // State for filtering plate numbers

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

  const fetchData = useCallback(async () => {
    try {
      const Vehicles = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/vehicles-id-list`
      );

      setVehicleData(Vehicles.data);
      // console.log(Vehicles.data);
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
  }, []);

  useEffect(() => {
    fetchData(); // Call the fetch function
  }, []);

  // filter
  const inactiveVehicles = vehicleData
    .filter((item) => item.vehicleStatus === "WAITING")
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

  useEffect(() => {
    // Assuming editVehicle is the vehicle data coming from the endpoint
    if (editVehicle && editVehicle.plateNumber) {
      const [state, identifier, code] = editVehicle.plateNumber.split("-");
      setPlateNumber({ state, identifier, code });
    }
  }, [editVehicle]);

  // Additional state to hold plate number components
  const [plateNumber, setPlateNumber] = useState({
    state: "",
    identifier: "",
    code: "",
  });

  const handleUpdate = async (event) => {
    event.preventDefault();

    // Combine the plate number components into the formatted string
    const formattedPlateNumber = `${plateNumber.state}-${plateNumber.identifier}-${plateNumber.code}`;

    // Prepare the updated vehicle object
    const updatedVehicle = {
      plateNumber: formattedPlateNumber,
      // Add any other vehicle details here that need to be updated
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/update/vehicle/${editVehicle.id}`,
        updatedVehicle
      );

      addMessage("Vehicle updated successfully!", "success");

      // Close modal and reset edited vehicle
      handleClose();
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
  };

  const handelDeleteVehicle = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/delete/vehicles/${id}`
      );

      addMessage("Vehicle deleted successfully!", "success");
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
    <div className={open ? "blur-background" : ""}>
      <h2 className="tableDataHeaderTitle">
        <div className="titleAndRefresh">
          <div className="titleLeft">Waiting Vehicles Update Form </div>

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
                  <td>{vehicle.vehicleStatus}</td>
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
                          onClick={() => handelDeleteVehicle(vehicle.id)}
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {editVehicle && (
            <div>
              <h3 className="textcenter">
                Vehicle: &nbsp; {editVehicle.vehicleName} &nbsp; - &nbsp;
                {editVehicle.model}
              </h3>
              <form className="form heightfit" onSubmit={handleUpdate}>
                <TextField
                  label="Vehicle Name"
                  name="vehicleName"
                  value={editVehicle.vehicleName}
                  fullWidth
                  margin="normal"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                <TextField
                  label="Brand"
                  name="brand"
                  value={editVehicle.brand}
                  fullWidth
                  margin="normal"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                <TextField
                  label="Model"
                  name="model"
                  value={editVehicle.model}
                  fullWidth
                  margin="normal"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />

                <div className="form-flex vehicleform-flex">
                  <label>
                    <div className="vehicleplate-number-title">
                      Plate Number
                    </div>
                    <div className="vehicleinput-group">
                      <input
                        type="text"
                        placeholder="State"
                        value={plateNumber.state}
                        onChange={(e) =>
                          setPlateNumber({
                            ...plateNumber,
                            state: e.target.value,
                          })
                        }
                        required
                        maxLength="2"
                        className="vehicleinput vehicleinput-small"
                      />
                      <span className="vehicledash">-</span>
                      <input
                        type="text"
                        placeholder="Identifier"
                        value={plateNumber.identifier}
                        onChange={(e) =>
                          setPlateNumber({
                            ...plateNumber,
                            identifier: e.target.value,
                          })
                        }
                        required
                        maxLength="6"
                        className="vehicleinput vehicleinput-medium"
                      />
                      <span className="vehicledash">-</span>
                      <input
                        type="text"
                        placeholder="Code"
                        value={plateNumber.code}
                        onChange={(e) =>
                          setPlateNumber({
                            ...plateNumber,
                            code: e.target.value,
                          })
                        }
                        required
                        maxLength="1"
                        className="vehicleinput vehicleinput-small"
                      />
                    </div>
                  </label>
                </div>

                <br />
                <button type="submit" className="submit">
                  Save
                </button>
              </form>
            </div>
          )}
        </Box>
      </Modal>

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default UpdateVehicleDetails;
