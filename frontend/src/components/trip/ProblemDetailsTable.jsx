import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Paginator from "../paginator/Paginator";
import Problem from "../../data/Problem"; // Importing dummy data

const ProblemDetailsTable = () => {
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
      <h2 className="tableDataHeaderTitle">{vehicleData.length} - Problems</h2>
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
            <th>Problems</th>
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

export default ProblemDetailsTable;
