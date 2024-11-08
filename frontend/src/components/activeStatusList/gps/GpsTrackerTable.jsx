import React, { useEffect, useState, useCallback } from "react";

import Paginator from "../../paginator/Paginator";
import axios from "axios";
import MessagePopup from "../../messageComponent/MessagePopup";
import { createTheme, ThemeProvider, Button, Stack } from "@mui/material";
import { formatRfidStatus } from "../../devices/formatRfidStatus";

const GpsTrackerTable = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [plateNumber, setPlateNumber] = useState("");

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
      const eseal = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/EsealAllDatalist`
      );
      setDeviceData(eseal.data);
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

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deviceData.slice(indexOfFirstItem, indexOfLastItem); // Slice the data based on current page

  // Calculate the total number of pages
  const totalPages = Math.ceil(deviceData.length / itemsPerPage);

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
      assignedColor: createColor("#95EF71"),
      unAssignedColor: createColor("#F6B85A"),
      assignedColorkey: createColor("#DFC57B"),
      unAssignedColorkey: createColor("#175E60"),
    },
  });

  const displayPlateNumber = async (id) => {
    try {
      const vehicle = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/vehicles/${id}`
      );

      setPlateNumber(vehicle.data.plateNumber);
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

  return (
    <div>
      <h2 className="tableDataHeaderTitle">
        All {deviceData.length} GPS Tracker Devices Status
      </h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>GPS Tag Name</th>
            <th>GPS Brand</th>
            <th>Rfid Type</th>
            <th>RFID Keys</th>
            <th>Status</th>
            <th>Vehicle</th>
            <th>Speed</th>
            <th>Installation Date</th>
            <th>Battery</th>
            {/* <th>Operations</th> */}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((device) => (
              <tr key={device.id}>
                <td>{device.tagName}</td>
                <td>{device.brand}</td>
                {/* Rfid Type */}
                <td>
                  <div className="flexList">
                    {device.rfidKeys.map((rfid, idx) => (
                      <Stack direction="row" key={idx}>
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color={
                              rfid.rfidType === "PASSIVE_RFID"
                                ? "assignedColor"
                                : "unAssignedColor"
                            }
                            key={idx}
                          >
                            <span className="sentencebutton">
                              {formatRfidStatus(rfid.rfidType)}
                            </span>
                          </Button>
                        </ThemeProvider>
                      </Stack>
                    ))}
                  </div>
                </td>
                {/* keyCode */}
                <td>
                  <div className="flexList">
                    {device.rfidKeys.map((rfid, idx) => (
                      <Stack direction="row" key={idx}>
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color={"assignedColorkey"}
                            key={idx}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="9"
                              height="9"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-key"
                            >
                              <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
                              <path d="m21 2-9.6 9.6" />
                              <circle cx="7.5" cy="15.5" r="5.5" />
                            </svg>
                            &nbsp;
                            <span className="sentencebutton">
                              {formatRfidStatus(rfid.keyCode)}
                            </span>
                          </Button>
                        </ThemeProvider>
                      </Stack>
                    ))}
                  </div>
                </td>
                <td>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color={
                        device.electronicSealStatus === "UNLOCKED"
                          ? "assignedColor"
                          : "unAssignedColor"
                      }
                      className="smallbutton"
                    >
                      <span className="sentencebutton">
                        {formatRfidStatus(device.electronicSealStatus)}
                      </span>
                    </Button>
                  </ThemeProvider>
                </td>
                <td>
                  {/* {device.electronicSealStatus === "LOCKED" &&
                  displayPlateNumber(device.vehicleId) ? (
                    <span>{plateNumber}</span> // and display the vehicleName here
                  ) : (
                    ""
                  )} */}
                  Bug - "infinite calling"
                </td>
                <td>{device.speed}</td>
                <td>{device.InstallationDate}</td>
                <td>{device.BatteryLevel}</td>
                {/* <td>
                  {device.status === "Inactive" ? (
                    <Button
                      variant="contained"
                      color="error"
                      className="smallbutton"
                    >
                      &nbsp; &nbsp;
                      <span className="sentencebutton">Delete</span>
                    </Button>
                  ) : (
                    ""
                  )}
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default GpsTrackerTable;
