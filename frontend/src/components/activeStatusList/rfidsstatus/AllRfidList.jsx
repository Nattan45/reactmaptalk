import React, { useEffect, useState } from "react";
import "../../devices/tableStyle.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";
import { formatRfidStatus } from "../../devices/formatRfidStatus";
import MessagePopup from "../../messageComponent/MessagePopup";
import Paginator from "../../paginator/Paginator";

const AllRfidList = () => {
  const [FreeRfidsData, setFreeRfidsData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

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
        const FreeRfids = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/rfidkey-id-list`
        );

        setFreeRfidsData(FreeRfids.data);
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
      assignedColor: createColor("#95EF71"),
      unAssignedColor: createColor("#F6B85A"),
    },
  });

  const handelRfidDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/delete/rfidkey/${id}`
      );

      addMessage("Rfid Deleted Successfully!", "success");
      // Remove the deleted RFID from the local state
      setFreeRfidsData((prevData) => prevData.filter((rfid) => rfid.id !== id));
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
        <span>{currentItems.length}</span> All Rfid Keys
      </h2>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>RFID Keys</th>
            <th>Status</th>
            <th>Tag Type</th>
            <th>Installation Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((Rfids) => (
                <tr key={Rfids.id}>
                  <td>{Rfids.keyCode}</td>
                  <td>
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        color={
                          Rfids.rfidStatus === "ASSIGNED"
                            ? "assignedColor"
                            : "unAssignedColor"
                        }
                        className="smallbutton"
                      >
                        <span className="sentencebutton">
                          {formatRfidStatus(Rfids.rfidStatus)}
                        </span>
                      </Button>
                    </ThemeProvider>
                  </td>
                  <td>{formatRfidStatus(Rfids.rfidType)}</td>
                  <td>
                    {Rfids.installationDate
                      ? new Date(Rfids.installationDate)
                          .toISOString()
                          .split("T")[0]
                      : "Not installed"}
                  </td>

                  <td>
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        color={
                          Rfids.rfidStatus === "ASSIGNED"
                            ? "inactivebtn"
                            : "error"
                        }
                        className="smallbutton"
                        onClick={() => {
                          if (Rfids.rfidStatus === "ASSIGNED") {
                            addMessage("The Rfid Is Assigned", "warning");
                          } else {
                            handelRfidDelete(Rfids.id);
                          }
                        }}
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

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default AllRfidList;
