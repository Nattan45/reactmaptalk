import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Paginator from "../paginator/Paginator";
import Problem from "../../data/Problem"; // Importing dummy data

const WarningDetailsTable = () => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const navigate = useNavigate(); // For redirecting

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setVehicleData(Problem); // Load the dummy data into state
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

  // Handle Problem selection and redirect to the details page
  const handleSelectProblem = (id) => {
    navigate(`/problem/${id}`); // Redirect to ProblemDetails page
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle">{vehicleData.length} - Warnings</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Plate Number</th>
            <th>Driver ID</th>
            <th>Driver Name</th>
            <th>Phone Number</th>
            <th>Gps Tag</th>
            <th>Battery</th>
            <th>Gps Status</th>
            <th>Installation Date</th>
            <th>Trip Starting Date</th>
            <th>From-To</th>
            <th>Warning</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((problem) => (
              <tr key={problem.id}>
                <td>{problem.tripId}</td>
                <td>{problem.plateNumber}</td>
                {/* driver Id */}
                <td>
                  {Array.isArray(problem.eSeal) ? (
                    <div className="batterybutton">
                      {problem.driver.map((driver, index) => (
                        <p key={index}>{driver.driverId}</p>
                      ))}
                    </div>
                  ) : (
                    <p>No data</p>
                  )}
                </td>
                {/* driver Name */}
                <td>
                  {Array.isArray(problem.eSeal) ? (
                    <div className="batterybutton">
                      {problem.driver.map((driver, index) => (
                        <p key={index}>{driver.driverName}</p>
                      ))}
                    </div>
                  ) : (
                    <p>No data</p>
                  )}
                </td>
                {/* driver Phone Number */}
                <td>
                  {Array.isArray(problem.eSeal) ? (
                    <div className="batterybutton">
                      {problem.driver.map((driver, index) => (
                        <p key={index}>{driver.phoneNumber}</p>
                      ))}
                    </div>
                  ) : (
                    <p>No data</p>
                  )}
                </td>
                {/* Number of GPS trackers */}
                <td>
                  {Array.isArray(problem.eSeal) ? (
                    <div className="activeEsealDataContainer">
                      {/* Button to show the number of GPS trackers */}
                      <div className="activeEsealfirstData">
                        {problem.eSeal.length} GPS
                      </div>
                    </div>
                  ) : (
                    <p>No data </p>
                  )}
                </td>
                {/* Battery */}
                <td>
                  {Array.isArray(problem.eSeal) ? (
                    <div className="batterybutton">
                      {problem.eSeal.map((seal, index) => (
                        <div key={index}>
                          <p>
                            <button>
                              {seal.gpsId} {seal.battery}%
                            </button>
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No data</p>
                  )}
                </td>
                {/* Gps Status  */}
                <td>
                  {Array.isArray(problem.eSeal) ? (
                    <div className="batterybutton">
                      {problem.eSeal.map((seal, index) => (
                        <div key={index}>
                          <p>
                            <button>
                              {seal.gpsId} {seal.status}
                            </button>
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No data</p>
                  )}
                </td>
                <td>{problem.gpsMountedDate}</td>
                <td>{problem.tripStartingDate}</td>
                <td>{problem.fromto}</td>
                {/* problems  */}
                <td>
                  <svg
                    key={problem.id}
                    onClick={() => handleSelectProblem(problem.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff7700"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-flag"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" x2="4" y1="22" y2="15" />
                  </svg>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12">No data </td>
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
export default WarningDetailsTable;
