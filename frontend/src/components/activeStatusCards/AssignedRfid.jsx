import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { formatRfidStatus } from "../devices/formatRfidStatus";
import MessagePopup from "../messageComponent/MessagePopup";
import Paginator from "../paginator/Paginator";

const AssignedRfid = () => {
  const [AssignedRfidsData, setAssignedRfidsData] = useState([]); // State for the full data
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

  const fetchData = useCallback(async () => {
    try {
      const AssignedRfids = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/rfidkey-id-list`
      );

      setAssignedRfidsData(AssignedRfids.data);
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
    fetchData();
  }, []);

  // **Filter the deviceData to show only "Active" devices**
  const AssignedRfids = AssignedRfidsData.filter(
    (rfid) => rfid.rfidStatus === "ASSIGNED"
  );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = AssignedRfids.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered data based on current page

  // Calculate the total number of pages for AssignedRfids
  const totalPages = Math.ceil(AssignedRfids.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
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
    <div>
      <h2 className="tableDataHeaderTitle">
        <div className="titleAndRefresh">
          <div className="titleLeft">
            <span>{AssignedRfids.length}</span> Assigned Rfid Keys{" "}
          </div>

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
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>RFID Keys</th>
            <th>Tag Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((Rfids) => (
                <tr key={Rfids.id}>
                  <td>{Rfids.keyCode}</td>
                  <td>{formatRfidStatus(Rfids.rfidType)}</td>
                  <td>{formatRfidStatus(Rfids.rfidStatus)}</td>
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

export default AssignedRfid;
