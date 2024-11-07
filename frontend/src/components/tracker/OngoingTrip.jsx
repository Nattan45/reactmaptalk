import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Paginator from "../paginator/Paginator";
import Vehicles from "../../data/ActiveVehicle"; // Importing dummy data
import MessagePopup from "../messageComponent/MessagePopup";
import axios from "axios";

const OngoingTrip = () => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [showGpsList, setShowGpsList] = useState(false); // State for showing/hiding GPS list
  const navigate = useNavigate(); // For redirecting

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
        const tripDatas = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/trip-detail/Objects`
        );
        setVehicleData(tripDatas.data);
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
  const currentItems = vehicleData.slice(indexOfFirstItem, indexOfLastItem); // Slice the data based on current page

  // Calculate the total number of pages
  const totalPages = Math.ceil(vehicleData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  // Function to toggle the GPS list visibility
  const toggleGpsList = () => {
    setShowGpsList((prevState) => !prevState);
  };

  // Handle Problem selection and redirect to the details page
  const handleSelectProblem = (id) => {
    navigate(`/problem/${id}`); // Redirect to ProblemDetails page
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle">
        {vehicleData.length} - Vehicles On Trip Status
      </h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Plate Number</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Driver Name</th>
            <th>Phone Number</th>
            <th>Gps Tag</th>
            <th>Battery</th>
            <th>Installation Date</th>
            <th>Trip Starting Date</th>
            <th>From-To</th>
            <th>Signal</th>
            <th>Warnings</th>
            <th>Problems</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.tripTicketId}</td>
                <td>{trip.vehicle ? trip.vehicle.plateNumber : "N/A"}</td>
                <td>{trip.vehicle ? trip.vehicle.brand : "N/A"}</td>
                <td>{trip.vehicle ? trip.vehicle.model : "N/A"}</td>
                <td>
                  {trip.driver
                    ? trip.driver.firstName - trip.driver.lastName
                    : "N/A"}
                </td>
                <td>{trip.driver ? trip.driver.phoneNumber : "N/A"}</td>
                {/* Number of GPS trackers */}
                <td>
                  {Array.isArray(trip.electronicSealIds) ? (
                    <div className="activeEsealDataContainer">
                      {/* Button to show the number of GPS trackers */}
                      <div className="activeEsealfirstData">
                        {trip.electronicSealIds.length} GPS
                        {/* Button to toggle GPS list visibility */}
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
                          className="lucide lucide-chevron-down"
                          onClick={toggleGpsList}
                        >
                          <path d="m6 9 6 6 6-6" />
                          {showGpsList ? "Hide GPS List" : "Show GPS List"}
                        </svg>
                      </div>
                      {/* Conditional rendering of GPS list based on state */}
                      {showGpsList &&
                        trip.electronicSealIds.map((seal, index) => (
                          <div key={index} className="activeEsealData">
                            <p>
                              GPS ID: {seal.tagName}, Status:{" "}
                              {seal.electronicSealStatus}
                            </p>
                            <div className="activeEsealData-rfids">
                              {Array.isArray(seal.rfidKeys) &&
                                seal.rfidKeys.map((key) => (
                                  <button key={key.id}>
                                    RFID: {key.keyCode}
                                  </button>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p>No GPS data available</p>
                  )}
                </td>
                <td>
                  {Array.isArray(trip.electronicSealIds) ? (
                    <div className="batterybutton">
                      {trip.electronicSealIds.map((seal, index) => (
                        <div key={index}>
                          <p>
                            <button>
                              {/* {seal.tagName} {seal.battery}% */}
                              {seal.tagName} {"N/A"} %
                            </button>{" "}
                            {""}
                            <button></button>
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No GPS data available</p>
                  )}
                </td>
                <td>{trip.gpsMountedDate}</td>
                <td>{trip.tripStartingDate}</td>
                <td>
                  {trip.startingPoint} - {trip.destination}
                </td>
                <td>{trip.Signal}</td>
                <td>
                  {Array.isArray(trip.warnings) &&
                    trip.warnings.map((warning, index) => (
                      <svg
                        key={index}
                        onClick={() => handleSelectProblem(warning.id)} // Correctly pass Problem.id
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff0000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-octagon-x"
                      >
                        <path d="m15 9-6 6" />
                        <path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
                        <path d="m9 9 6 6" />
                      </svg>
                    ))}
                </td>
                <td>
                  {Array.isArray(trip.problems) && trip.problems.length > 0 && (
                    <svg
                      key={trip.id}
                      onClick={() => handleSelectProblem(trip.id)} // Correctly pass Problem.id
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff0000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-octagon-x"
                    >
                      <path d="m15 9-6 6" />
                      <path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
                      <path d="m9 9 6 6" />
                    </svg>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No data available</td>
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

export default OngoingTrip;
