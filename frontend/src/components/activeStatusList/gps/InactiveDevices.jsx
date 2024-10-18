import React, { useEffect, useState } from "react";

import Paginator from "../../paginator/Paginator";
import MessagePopup from "../../messageComponent/MessagePopup";
import axios from "axios";
import {
  createTheme,
  ThemeProvider,
  Button,
  Stack,
  Modal,
} from "@mui/material";
import { formatRfidStatus } from "../../devices/formatRfidStatus";

const InactiveDevices = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  const [rfidKeyId, setRfidKeyId] = useState([]); // State for RFID Keys
  const [open, setOpen] = useState(false); // State to control the modal open/close

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

  // **Filter the deviceData to show only "Active" devices**
  const activeEsealsCount = deviceData.filter(
    (eseal) => eseal.electronicSealStatus === "UNLOCKED"
  );

  // console.log(activeEsealsCount);

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeEsealsCount.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // Slice the filtered data based on current page

  // Calculate the total number of pages for active devices
  const totalPages = Math.ceil(activeEsealsCount.length / itemsPerPage);

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

  const [deviceId, setDeviceId] = useState([]); // State for RFID Keys
  // Handle RFID Edit Button Click
  const handleEditRfid = (deviceid, rfidKeys) => {
    setRfidKeyId(rfidKeys); // Set RFID keys for selected device
    setDeviceId(deviceid);
    setOpen(true); // Open the modal
  };

  // Handle Save RFID Keys
  const handleSave = async () => {
    // Get the RFID keys' keyCodes
    const newRfidKeys = rfidKeyId.map((rfid) => rfid.keyCode);

    console.log(newRfidKeys, "newRfidKeys    108");

    try {
      // Send the updated RFID keyCodes to the backend
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/eseal/update-rfid-keys/${deviceId}`,
        { rfidKeys: newRfidKeys } // Adjust the payload to match your backend's expectation
      );

      console.log("Updated RFID keys:", response.data);
      setOpen(false); // Close the modal after save
      addMessage("RFID keys updated successfully", "success");
    } catch (err) {
      addMessage("Failed to update RFID keys", "error");
    }
  };

  // Handle changes in RFID keys input
  const handleRfidKeyChange = (index, value) => {
    const updatedKeys = [...rfidKeyId];
    updatedKeys[index].keyCode = value;
    setRfidKeyId(updatedKeys);
  };

  // Add a new empty RFID key input field
  const handleAddRfidKey = () => {
    setRfidKeyId([...rfidKeyId, { keyCode: "" }]);
  };

  // Remove an RFID key input field
  const handleRemoveRfidKey = (index) => {
    const updatedKeys = [...rfidKeyId];
    updatedKeys.splice(index, 1);
    setRfidKeyId(updatedKeys);
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle inactiveColor">
        <span>{activeEsealsCount.length}</span> Inactive GPS Tracker Devices
      </h2>
      <table border="1" cellPadding="10" className="inactivedevicesTable">
        <thead className="inactivedevicesTable-header">
          <tr>
            <th>Tag Name</th>
            <th>Brand</th>
            <th>Rfid Type</th>
            <th>RFID Keys</th>
            <th>Edit Rfid</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((device, key) => (
              <tr key={key}>
                <td>{device.tagName}</td>
                <td>{device.brand}</td>
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
                              {rfid.keyCode}
                            </span>
                          </Button>
                        </ThemeProvider>
                      </Stack>
                    ))}
                  </div>
                </td>
                {/* Rfid */}
                <td>
                  {device.electronicSealStatus === "UNLOCKED" ? (
                    <Button
                      variant="contained"
                      color="success"
                      className="smallbutton"
                      onClick={() => handleEditRfid(device.id, device.rfidKeys)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-pencil"
                      >
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      &nbsp; &nbsp;
                      <span className="sentencebutton">Rfid</span>
                    </Button>
                  ) : (
                    ""
                  )}
                </td>
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
          ) : (
            <tr>
              <td colSpan="6">No active devices available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Using the Paginator component */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal for Editing RFID Keys */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="modalContent">
          <h2>Edit RFID Keys</h2>
          {rfidKeyId.map((rfid, index) => (
            <div key={index}>
              <input
                type="text"
                value={rfid.keyCode}
                onChange={(e) => handleRfidKeyChange(index, e.target.value)}
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveRfidKey(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={handleAddRfidKey}>Add RFID Key</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Modal>

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default InactiveDevices;
