import React, { useEffect, useState } from "react";

import Paginator from "../../paginator/Paginator";
import { createTheme, ThemeProvider, Button, Stack } from "@mui/material";
import axios from "axios";
import MessagePopup from "../../messageComponent/MessagePopup";
import { formatRfidStatus } from "../../devices/formatRfidStatus";

const ActiveDevices = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
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
    };

    fetchData();
  }, []);

  const activeDevices = deviceData
    .filter((item) => item.electronicSealStatus === "LOCKED")
    .filter((item) =>
      (item.vehicle || "").toLowerCase().includes(filterText.toLowerCase())
    );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeDevices.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered data based on current page

  // Calculate the total number of pages for active devices
  const totalPages = Math.ceil(activeDevices.length / itemsPerPage);

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

  return (
    <div>
      <h2 className="tableDataHeaderTitle activeColor">
        <span>{activeDevices.length}</span> Active GPS Tracker Devices
      </h2>
      <div className="filters nomarginTop">
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
            <th>Tag Name</th>
            <th>Brand</th>
            <th>Gps Id</th>
            <th>RFID Keys</th>
            <th>Vehicle</th>
            <th>Speed</th>
            <th>Installation Date</th>
            <th>Battery</th>
            <th>Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((device) => (
                <tr key={device.id}>
                  <td>{device.tagName}</td>
                  <td>{device.brand}</td>
                  <td>
                    <div className="flexList">
                      {device.rfidKeys.map((rfid, idx) => (
                        <Stack direction="row">
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
                  <td>
                    <div className="flexList">
                      {device.rfidKeys.map((rfid, idx) => (
                        <Stack direction="row">
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
                                {rfid.keyCode}
                              </span>
                            </Button>
                          </ThemeProvider>
                        </Stack>
                      ))}
                    </div>
                  </td>
                  <td>{device.vehicle}</td>
                  <td>{device.speed}</td>
                  <td>{device.InstallationDate}</td>
                  <td>{device.BatteryLevel}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      className="smallbutton"
                    >
                      <span className="sentencebutton">Deactivate</span>
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

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default ActiveDevices;
