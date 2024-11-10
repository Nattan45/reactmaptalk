import React, { useEffect, useState } from "react";

import "./checkpoints.css";
import Paginator from "../../paginator/Paginator";
import MessagePopup from "../../messageComponent/MessagePopup";
import axios from "axios";
import CheckpointsListMaptalksView from "./CheckpointsListMaptalksView";

const CheckpointsList = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [totalCheckpoints, setTotalCheckpoints] = useState(0); // State for total checkpoints

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
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/get/mongo/getCheckpoints`
        );

        const Data = response.data.checkpoints;

        setDeviceData(Data); // Load the combined data into state
        setTotalCheckpoints(Data.length);
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

  const [selectedCheckpointId, setSelectedCheckpointId] = useState(null);

  const viewCheckpointsOnMaptalks = (selectedCheckpointId) => {
    setSelectedCheckpointId(selectedCheckpointId); // Update state
  };

  // delete Checkpoints from Springboot > then Mongo
  const deleteCheckpoints = async (selectedCheckpointId) => {
    try {
      // Step 1: Send DELETE request to Spring Boot to delete the checkpoint by checkpointId
      const springResponse = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/delete-checkpoint/${selectedCheckpointId}`
      );

      // Check if the deletion in Spring Boot was successful
      if (springResponse.data.success) {
        addMessage("Checkpoint deleted successfully.", "success");

        // Step 2: Send DELETE request to MongoDB to delete the checkpoint by checkpointId
        const mongoResponse = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/deleteCheckpoint/mongo/deleteCheckpointByCheckpointID/${selectedCheckpointId}`
        );

        if (mongoResponse.data.success) {
          addMessage("Cached checkpoint deleted successfully.", "success");
        } else {
          addMessage("Failed to delete checkpoint from the CACHE .", "error");
        }
      } else {
        addMessage(
          "Failed to delete checkpoint in: checkpoint may be assigned to a Trip or Vehicle.",
          "error"
        );
      }
    } catch (error) {
      // Handle any errors encountered during the process
      addMessage("Error deleting checkpoint: " + error.message, "error");
    }
  };

  return (
    <div className="gridCenter">
      <div className="checkpintsList fitContent">
        <h2 className="tableDataHeaderTitle ">
          All {totalCheckpoints} Checkpoints Status
        </h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Checkpoint Name</th>
              <th>Checkpoint ID</th>
              <th>Coordinates</th>
              <th>Area</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((checkpoint, idx) => (
                <React.Fragment key={idx}>
                  <tr key={idx}>
                    <td>{checkpoint.rectangleName}</td>
                    <td>{checkpoint.checkpointId}</td>
                    <td>
                      Lower Left: &nbsp;Latitude = &nbsp;
                      {checkpoint.lowerLeft.latitude.toFixed(5)},
                      &nbsp;Longitude &nbsp;= &nbsp;
                      {checkpoint.lowerLeft.longitude.toFixed(5)}
                      <br />
                      <br />
                      Upper Right: Latitude &nbsp;= &nbsp;
                      {checkpoint.upperRight.latitude.toFixed(5)},
                      &nbsp;Longitude &nbsp;= &nbsp;
                      {checkpoint.upperRight.longitude.toFixed(5)}
                    </td>
                    <td>{checkpoint.area}</td>
                    <td>
                      {/* View icon */}
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
                        className="lucide lucide-eye"
                        onClick={() =>
                          viewCheckpointsOnMaptalks(checkpoint.checkpointId)
                        }
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      &nbsp;&nbsp; &nbsp;&nbsp;
                      {/* Delete icons */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff0000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trash-2"
                        onClick={() =>
                          deleteCheckpoints(checkpoint.checkpointId)
                        }
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>

        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="showSelectedRoutes">
        <CheckpointsListMaptalksView
          selectedCheckpointId={selectedCheckpointId}
        />
      </div>

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default CheckpointsList;
