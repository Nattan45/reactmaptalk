import React, { useEffect, useState } from "react";
import Paginator from "../paginator/Paginator";
import ActiveVehicle from "../../data/ActiveVehicle";
// import ActiveVehicleDetails from "./ActiveVehicleDetails";

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
    const platenumber = vehicle.platenumber
      ? vehicle.platenumber.toLowerCase()
      : "";
    const brand = vehicle.brand ? vehicle.brand.toLowerCase() : "";
    const model = vehicle.model ? vehicle.model.toLowerCase() : "";
    const eSeal = vehicle.eSeal ? vehicle.eSeal.toLowerCase() : "";
    const filter = filterText.toLowerCase();

    return (
      tripId.includes(filter) ||
      driverId.includes(filter) ||
      platenumber.includes(filter) ||
      brand.includes(filter) ||
      model.includes(filter) ||
      eSeal.includes(filter)
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
    // setSelectedVehicleId(vehicle.id);
    onVehicleSelect(vehicle.id, vehicleData); // Pass selected vehicle to parent
  };

  return (
    <div className="trackParametersContainer">
      <h2 className="tableDataHeaderTitle">
        <span></span> Live Tracking Vehicles
      </h2>

      <div className="filters">
        <input
          placeholder="TripID, plate Number"
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
                  <td> {vehicle.tripId} </td>
                  <td>{vehicle.driverId}</td>
                  <td>{vehicle.plateNumber}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.eSeal}</td>
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

//     <div className="trackParametersContainer">
//       <div className="plateNumberQuerryForm">
//         <form className="form wh-fit-content zerozero firstzerozero">
//           <label>
//             <input type="text" required className="input" />
//             <span>Plate Number</span>
//           </label>
//           <button type="submit" className="submit wh-fit-content placeEnd">
//             Track
//           </button>
//         </form>
//       </div>
//       <div className="driverIdQueryForm">
//         <form className="form wh-fit-content zerozero">
//           <label>
//             <input type="text" required className="input" />
//             <span>Driver ID</span>
//           </label>
//           <button type="submit" className="submit wh-fit-content placeEnd">
//             Track
//           </button>
//         </form>
//       </div>
//       <div className="gpsIdQueryForm">
//         <form className="form wh-fit-content zerozero">
//           <label>
//             <input type="text" required className="input" />
//             <span>Gps ID</span>
//           </label>
//           <button type="submit" className="submit wh-fit-content placeEnd">
//             Track
//           </button>
//         </form>
//       </div>
//       <div className="driverIdQueryForm">
//         <form className="form wh-fit-content zerozero">
//           <label>
//             <input type="text" required className="input" />
//             <span>Trip ID</span>
//           </label>
//           <button type="submit" className="submit wh-fit-content placeEnd">
//             Track
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
