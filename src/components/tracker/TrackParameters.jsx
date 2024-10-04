import React, { useEffect, useState } from "react";

import Paginator from "../paginator/Paginator";
import ActiveVehicle from "../../data/ActiveVehicle";

const TrackParameters = ({ onVehicleSelect }) => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(5); // Number of items per page
  const [filterText, setFilterText] = useState(""); // State for filtering plate numbers
  // const [selectedVehicleId, setSelectedVehicleId] = useState(null); // Track selected vehicle ID

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setVehicleData(ActiveVehicle); // Load the dummy data (all active vehicles to be tracked)
    };
    fetchData(); // Call the fetch function
  }, []);

  const allVehicle = vehicleData;

  // Apply filter based on filterText (name, ID, phone number, or email)
  const filteredVehicles = allVehicle.filter((vehicle) => {
    const tripId = vehicle.tripId ? vehicle.tripId.toLowerCase() : "";
    const driverId = vehicle.driverId ? vehicle.driverId.toLowerCase() : "";
    const platenumber = vehicle.plateNumber
      ? vehicle.plateNumber.toLowerCase()
      : "";
    const brand = vehicle.brand ? vehicle.brand.toLowerCase() : "";
    const model = vehicle.model ? vehicle.model.toLowerCase() : "";

    // Check if eSeal is an array, and map through it to extract gpsIds
    const eSeal = Array.isArray(vehicle.eSeal)
      ? vehicle.eSeal.map((eSealItem) => eSealItem.gpsId.toLowerCase())
      : []; // Default to an empty array if eSeal is not an array

    const filter = filterText.toLowerCase();

    return (
      tripId.includes(filter) ||
      driverId.includes(filter) ||
      platenumber.includes(filter) ||
      brand.includes(filter) ||
      model.includes(filter) ||
      eSeal.some((gpsId) => gpsId.includes(filter)) // Check if any gpsId matches
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
  const handleViewClick = (vehicle) => {
    onVehicleSelect(vehicle.id, vehicleData); // Ensure that vehicleData does not contain the entire vehicle object
  };

  return (
    <div className="trackParametersContainer">
      <h2 className="tableDataHeaderTitle">
        <span></span> Live Tracking Vehicles
      </h2>

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
            ? currentItems.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.tripId}</td>
                  <td>
                    {vehicle.driver.map((driver, index) => (
                      <p key={index}>{driver.driverId}</p>
                    ))}
                  </td>
                  <td>{vehicle.plateNumber}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>
                    {Array.isArray(vehicle.eSeal) &&
                    vehicle.eSeal.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        {" "}
                        {/* Flex container */}
                        {vehicle.eSeal.map((eSealItem) => (
                          <button
                            key={eSealItem.id}
                            style={{
                              padding: "5px 10px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          >
                            {eSealItem.gpsId}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div>No GPS data</div> // Optional: Message if no eSeal data
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
                      onClick={() => handleViewClick(vehicle)}
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
    </div>
  );
};

export default TrackParameters;
