import React, { useEffect, useState } from "react";

import "./driver.css";
import { filterDrivers } from "./filterDrivers";
import Paginator from "../paginator/Paginator";
import {
  Box,
  TextField,
  Modal,
  Button,
  Stack,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import MessagePopup from "../messageComponent/MessagePopup";

const UpdateDriverDetails = () => {
  const [driverData, setDriverData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [editDriver, setEditDriver] = useState(null); // State for the driver to be edited
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Drivers = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/drivers-id-list`
        );
        setDriverData(Drivers.data);
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

    fetchData();
  }, []);

  const filteredDrivers = filterDrivers(driverData, filterText);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDrivers.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleUpdate = async (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Log the updated driver details using the name attributes
    const updatedDriver = {
      driverId: event.target.elements.driverId?.value || editDriver.driverId,
      phoneNumber:
        event.target.elements.phoneNumber?.value || editDriver.phoneNumber,
      email: event.target.elements.email?.value || editDriver.email,
      emergencyContact:
        event.target.elements.emergencyContact?.value ||
        editDriver.emergencyContact,
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/update/driver/${editDriver.id}`,
        {
          phoneNumber: updatedDriver.phoneNumber,
          email: updatedDriver.email,
          emergencyContact: updatedDriver.emergencyContact,
        }
      );
      addMessage("Driver updated successfully.", "success");
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

    console.log("Updated Driver Details:", updatedDriver);
    handleClose(); // Close the modal after saving or updating
  };

  const handelDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/delete/driver/${id}`
      );

      // Update the UI by removing the deleted driver from the state
      setDriverData((prevData) =>
        prevData.filter((driver) => driver.id !== id)
      );

      // Display success message
      addMessage("Driver successfully deleted.", "success");
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
      <h2 className="tableDataHeaderTitle">All Drivers Data</h2>

      {/* filter Function input */}
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

      {/* driver Data Table */}
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Driver ID</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Emergency Contact</th>
            <th>Status</th>
            <th>Ops</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.length > 0
            ? currentItems.map((driver) => (
                <tr key={driver.id}>
                  <td>{driver.firstName}</td>
                  <td>{driver.lastName}</td>
                  <td>{driver.gender}</td>
                  <td>{driver.driverId}</td>
                  <td>{driver.phoneNumber}</td>
                  <td>{driver.email}</td>
                  <td>{driver.emergencyContact}</td>
                  <td>{driver.driverStatus}</td>
                  <td>
                    <Stack direction="row" spacing={2}>
                      <ThemeProvider theme={theme}>
                        {/* Delete button */}
                        <Button
                          variant="contained"
                          color={
                            driver.driverStatus === "INACTIVE"
                              ? "inactivebtn"
                              : "error"
                          }
                          className="smallbutton"
                          onClick={() => {
                            if (driver.driverStatus === "INACTIVE") {
                              // Prevent deletion and possibly show a message
                              addMessage(
                                "Cannot delete an Deployed driver.",
                                "warning"
                              );
                            } else {
                              // Proceed with the deletion
                              handelDelete(driver.id);
                            }
                          }}
                        >
                          <span className="sentencebutton">Delete</span>
                        </Button>

                        {/* edit svg  */}
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
                            driver.driverStatus === "INACTIVE" ? "hide" : "show"
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
        <Box className="modalBox gridCenter">
          {editDriver && (
            <div className="gridCenter">
              <h3 className="widthfit">
                Edit Driver: {editDriver.firstName} {editDriver.lastName}
              </h3>
              <form className="form heightfit widthfit" onSubmit={handleUpdate}>
                <TextField
                  label="Driver_ID"
                  value={editDriver.driverId}
                  // onChange={handleChange}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />

                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  defaultValue={editDriver.phoneNumber}
                  margin="normal"
                  id="standard-basic"
                  variant="standard"
                  required
                />

                <TextField
                  label="Email"
                  name="email"
                  defaultValue={editDriver.email}
                  margin="normal"
                  id="standard-basic"
                  variant="standard"
                  required
                />

                <TextField
                  label="Emergency Contact"
                  name="emergencyContact"
                  defaultValue={editDriver.emergencyContact}
                  margin="normal"
                  id="standard-basic"
                  variant="standard"
                  required
                />

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

export default UpdateDriverDetails;
