import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import axios from "axios";
import { formatRfidStatus } from "../../devices/formatRfidStatus";
import MessagePopup from "../../messageComponent/MessagePopup";
import Paginator from "../../paginator/Paginator";

const FreeRfid = () => {
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
  const inactiveFreeRfids = FreeRfidsData.filter(
    (rfid) => rfid.rfidStatus === "UNASSIGNED"
  );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inactiveFreeRfids.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // Slice the filtered data based on current page

  // Calculate the total number of pages for FreeRfids
  const totalPages = Math.ceil(inactiveFreeRfids.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  const handelRfidDelete = async (id, status) => {
    try {
      // Check if the RFID status is not 'Unassigned'
      if (status !== "Unassigned") {
        // If the status is not 'Unassigned', proceed with the deletion
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/delete/rfidkey/${id}`
        );

        addMessage("Rfid Deleted Successfully!", "success");

        // Remove the deleted RFID from the local state
        setFreeRfidsData((prevData) =>
          prevData.filter((rfid) => rfid.id !== id)
        );
      } else {
        addMessage("Cannot delete RFID with status 'Unassigned'", "error");
      }
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
        <span>{inactiveFreeRfids.length}</span> Unassigned Rfid Keys
      </h2>
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>RFID Keys</th>
            <th>Tag Type</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((Rfids) => (
                <tr key={Rfids.id}>
                  <td>{Rfids.keyCode}</td>
                  <td>{formatRfidStatus(Rfids.rfidType)}</td>
                  <td>{formatRfidStatus(Rfids.rfidStatus)}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      className="smallbutton"
                    >
                      <span
                        className="sentencebutton"
                        onClick={() =>
                          handelRfidDelete(Rfids.id, Rfids.rfidStatus)
                        }
                      >
                        Delete
                      </span>
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

export default FreeRfid;
