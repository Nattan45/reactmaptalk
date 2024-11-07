import React, { useEffect, useState } from "react";

import Paginator from "../paginator/Paginator";
import axios from "axios";
import MessagePopup from "../messageComponent/MessagePopup";
// import ActiveVehicle from "../../data/ActiveVehicle";

const TrackParameters = ({ onTripSelect }) => {
  const [tripData, setTripData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(5); // Number of items per page
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
        const ActiveVehicle = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/trip-detail/Objects`
        );
        setTripData(ActiveVehicle.data);
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

  const allVehicle = tripData;

  // Apply filter based on filterText (name, ID, phone number, or email)
  const filteredVehicles = allVehicle.filter((trip) => {
    // const tripId = vehicle.tripId ? vehicle.tripId.toLowerCase() : "";
    const tripId = trip.tripTicketId ? trip.tripTicketId.toLowerCase() : "";
    const driverId = trip.driver ? trip.driver.driverId.toLowerCase() : "";
    const platenumber = trip.vehicle
      ? trip.vehicle.plateNumber.toLowerCase()
      : "";
    const brand = trip.vehicle ? trip.vehicle.brand.toLowerCase() : "";
    const model = trip.vehicle ? trip.vehicle.model.toLowerCase() : "";

    // Check if eSeal is an array, and map through it to extract tagNames
    const eSeal = Array.isArray(trip.electronicSealIds)
      ? trip.electronicSealIds.map((eSealItem) =>
          eSealItem.tagName.toLowerCase()
        )
      : []; // Default to an empty array if eSeal is not an array

    const filter = filterText.toLowerCase();

    return (
      tripId.includes(filter) ||
      driverId.includes(filter) ||
      platenumber.includes(filter) ||
      brand.includes(filter) ||
      model.includes(filter) ||
      eSeal.some((tagName) => tagName.includes(filter)) // Check if any tagName matches
    );
  });

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVehicles.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // Slice the filtered data based on current page

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  // Handle view click to select the vehicle

  // existing handleViewClick function
  const handleViewClick = (trip) => {
    onTripSelect(trip.id, tripData);
  };

  return (
    <div className="trackParametersContainer">
      <h2 className="tableDataHeaderTitle">Live Tracking Vehicles</h2>

      <div className="filters">
        <input
          placeholder="Trip ID, Plate Number"
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
            <th>Trip ID</th>
            <th>Driver ID</th>
            <th>Plate Number</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Gps</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((trip) => (
                <tr key={trip.id}>
                  {/* Map tripTicketId instead of tripId */}
                  <td>{trip.tripTicketId}</td>

                  {/* Update driver data display */}
                  <td>{trip.driver ? trip.driver.driverId : "No Driver"}</td>

                  {/* Map vehicle data for plateNumber, brand, and model */}
                  <td>{trip.vehicle ? trip.vehicle.plateNumber : "N/A"}</td>
                  <td>{trip.vehicle ? trip.vehicle.brand : "N/A"}</td>
                  <td>{trip.vehicle ? trip.vehicle.model : "N/A"}</td>

                  {/* Map eSeal GPS data */}
                  <td>
                    {Array.isArray(trip.electronicSealIds) &&
                    trip.electronicSealIds.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        {/* Flex container */}
                        {trip.electronicSealIds.map((eSealItem) => (
                          <button
                            key={eSealItem.id}
                            style={{
                              padding: "5px 10px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          >
                            {eSealItem.tagName}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div>No Tracker devices</div> // Optional: Message if no eSeal data
                    )}
                  </td>
                  <td>
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
                      onClick={() => handleViewClick(trip)}
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
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

      {/* Pass selectedVehicleId and vehicleData to ActiveVehicleDetails component
      <ActiveVehicleDetails
        vehicleId={selectedVehicleId}
        vehicleData={vehicleData}
      /> */}
      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default TrackParameters;
