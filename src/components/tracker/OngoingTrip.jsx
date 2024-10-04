import React, { useEffect, useState } from "react";
import Paginator from "../paginator/Paginator";
import Vehicles from "../../data/ActiveVehicle"; // Importing dummy data

const OngoingTrip = () => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [showGpsList, setShowGpsList] = useState(false); // State for showing/hiding GPS list

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setVehicleData(Vehicles); // Load the dummy data into state
    };
    fetchData(); // Call the fetch function
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
            currentItems.map((aVehicle) => (
              <tr key={aVehicle.id}>
                <td>{aVehicle.tripId}</td>
                <td>{aVehicle.plateNumber}</td>
                <td>{aVehicle.brand}</td>
                <td>{aVehicle.model}</td>
                <td>
                  {aVehicle.driver.map((driver, index) => (
                    <p key={index}>{driver.driverName}</p>
                  ))}
                </td>
                <td>
                  {aVehicle.driver.map((driver, index) => (
                    <p key={index}>{driver.phoneNumber}</p>
                  ))}
                </td>
                {/* Number of GPS trackers */}
                <td>
                  {Array.isArray(aVehicle.eSeal) ? (
                    <div className="activeEsealDataContainer">
                      {/* Button to show the number of GPS trackers */}
                      <div className="activeEsealfirstData">
                        {aVehicle.eSeal.length} GPS
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
                        aVehicle.eSeal.map((seal, index) => (
                          <div key={index} className="activeEsealData">
                            <p>
                              GPS ID: {seal.gpsId}, Status: {seal.status}
                            </p>
                            <div className="activeEsealData-rfids">
                              {Array.isArray(seal.rfidKeys) &&
                                seal.rfidKeys.map((key) => (
                                  <button key={key.id}>
                                    RFID: {key.RfidKey}
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
                  {Array.isArray(aVehicle.eSeal) ? (
                    <div className="batterybutton">
                      {aVehicle.eSeal.map((seal, index) => (
                        <div key={index}>
                          <p>
                            <button>
                              {seal.gpsId} {seal.battery}%
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
                <td>{aVehicle.gpsMountedDate}</td>
                <td>{aVehicle.tripStartingDate}</td>
                <td>{aVehicle.fromto}</td>
                <td>{aVehicle.Signal}</td>
                <td>{aVehicle.Warnings}</td>
                <td>{aVehicle.Problems}</td>
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
    </div>
  );
};

export default OngoingTrip;
