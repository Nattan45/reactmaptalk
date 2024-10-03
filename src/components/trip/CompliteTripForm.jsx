import React, { useEffect, useState } from "react";

import Paginator from "../paginator/Paginator";
import ActiveVehicle from "../../data/ActiveVehicle";
import ComplitedTrips from "./ComplitedTrips";

const CompliteTripForm = () => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(5); // Number of items per page
  const [filterText, setFilterText] = useState(""); // State for filtering plate numbers

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

  return (
    <div className="ccc">
      <div className="trackParametersContainer">
        <span>Complite Trip Form</span>

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
          <div>
            {currentItems.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <h3>{vehicle.plateNumber}</h3>
                <p>Status: {vehicle.status}</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCompleteTrip(vehicle.id);
                  }}
                >
                  <button type="submit">Complete Trip</button>
                </form>
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
