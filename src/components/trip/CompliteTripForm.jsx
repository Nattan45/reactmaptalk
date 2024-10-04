import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Paginator from "../paginator/Paginator";
import ActiveVehicle from "../../data/ActiveVehicle";
import ComplitedTrips from "./ComplitedTrips";

const CompliteTripForm = () => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(5); // Number of items per page
  const [filterText, setFilterText] = useState(""); // State for filtering plate numbers
  const [showGpsList, setShowGpsList] = useState(false); // State for showing/hiding GPS list

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setVehicleData(ActiveVehicle); // Load the dummy data (all active vehicles to be tracked)
    };
    fetchData(); // Call the fetch function
  }, []);

  const allVehicle = vehicleData;

  // Apply filter based on filterText (Trip ID or Plate Number)
  const filteredVehicles = allVehicle.filter((vehicle) => {
    const tripId = vehicle.tripId ? vehicle.tripId.toLowerCase() : "";
    const platenumber = vehicle.plateNumber
      ? vehicle.plateNumber.toLowerCase()
      : "";

    const filter = filterText.toLowerCase();

    return tripId.includes(filter) || platenumber.includes(filter);
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

  // Function to handle trip completion
  const handleCompleteTrip = (vehicleId) => {
    console.log(`Completing trip for vehicle ID: ${vehicleId}`);
    // Here you can add logic to call an API or update the state
  };

  // Function to handle Gps Open
  const handleOpenEseal = (esealId) => {
    console.log(`Eseal Is opened Eseal ID: ${esealId}`);
    // Here you can add logic to call an API or update the state
  };
  // Function to toggle the GPS list visibility
  const toggleGpsList = () => {
    setShowGpsList((prevState) => !prevState);
  };

  return (
    <div className="trackParametersContainer-WithReport">
      <span className="title textcenter green">Complite Trip Form</span>
      <div className="trackParametersContainer">
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

        {filterText === "" ? (
          <p>Please enter a Trip ID or Plate Number to search.</p>
        ) : currentItems.length === 0 ? (
          <p>No vehicles found</p>
        ) : (
          <div className="searchedVehicles">
            {currentItems.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <div className="searchedVehicles-Title">
                  {vehicle.tripId}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {vehicle.plateNumber}
                </div>
                <hr />
                <span className="driverName marginTB">
                  {vehicle.driver.map((driver, index) => (
                    <p key={index}>{driver.driverName}</p>
                  ))}
                </span>
                {Array.isArray(vehicle.eSeal) ? (
                  <div className="activeEsealDataContainer">
                    {/* Button to show the number of GPS trackers */}
                    <div className="activeEsealfirstData-start">
                      {vehicle.eSeal.length} GPS
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
                      vehicle.eSeal.map((seal, index) => (
                        <div key={index} className="activeEsealData-deactivate">
                          <span className="driverName">
                            {seal.gpsId}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status:{" "}
                            {seal.status}
                          </span>
                          <div className=" activeEsealData-openBtn">
                            {Array.isArray(seal.rfidKeys) &&
                              seal.rfidKeys.map((key) => (
                                <p key={key.id}>RFID: {key.RfidKey}</p>
                              ))}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#ff0000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-lock-open"
                              onClick={(e) => {
                                e.preventDefault();
                                handleOpenEseal(seal.id); // Function to complete the trip
                              }}
                            >
                              <rect
                                width="18"
                                height="11"
                                x="3"
                                y="11"
                                rx="2"
                                ry="2"
                              />
                              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    <form className="compliteTripform">
                      <Button
                        variant="text"
                        color="error"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCompleteTrip(vehicle.id); // Function to complete the trip
                        }}
                      >
                        <span className="sentencebutton">Complete Trip</span>
                      </Button>
                    </form>
                  </div>
                ) : (
                  <p>No GPS data available</p>
                )}
              </div>
            ))}
          </div>
        )}

        {filterText !== "" && (
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <div className="ComplitedTrips">
        <ComplitedTrips />
      </div>
    </div>
  );
};

export default CompliteTripForm;
