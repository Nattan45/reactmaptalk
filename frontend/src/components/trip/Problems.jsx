// import React, { useState } from "react";

// import Problem from "../../data/Problem";
// import { filterDriveridPlatenumberTripId } from "./filterDriveridPlatenumberTripId";
// import { Button } from "@mui/material";

// const Problems = () => {
//   const [filterText, setFilterText] = useState("");
//   const [selectedProblem, setSelectedProblem] = useState(null);
//   const [ProblemList] = useState(Problem); // No need for setProblemList

//   // Handle Problem selection and clear the filter text
//   const handleSelectProblem = (problem) => {
//     setSelectedProblem(problem); // Set the selected Problem
//     setFilterText(""); // Clear filter text after selection
//   };

//   // Filter Problems based on the input
//   const filteredProblems = filterDriveridPlatenumberTripId(
//     ProblemList,
//     filterText
//   );

//   return (
//     <div>
//       {/* Filter Input */}
//       <div className="filters">
//         <label className="textcenter formSectionTitles greenTitle">
//           Enter (TripId, PlateNumber or driverId){" "}
//           <span className="boldTitle">To See details</span>
//         </label>
//         <br />
//         <input
//           placeholder="Trip ID, plate Number, Driver Id"
//           type="text"
//           className="inputFilter"
//           value={filterText}
//           onChange={(e) => setFilterText(e.target.value)}
//         />
//       </div>

//       {/* Dropdown for filtered Problems */}
//       {filterText && filteredProblems.length > 0 && (
//         <ul className="dropdown">
//           {filteredProblems.map((problem) => (
//             <li key={problem.id} onClick={() => handleSelectProblem(problem)}>
//               <Button variant="text" color="primary">
//                 {`${problem.tripId} ${problem.plateNumber}`}
//               </Button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Display full details of selected Problem */}
//       {selectedProblem && (
//         <div className="problem-details-Container">
//           <h2 className="title textcenter marginTB redColor borderBottom">
//             Problem Details
//           </h2>
//           <br />
//           <div className="problem-details">
//             <p>
//               <strong>Trip ID:</strong> {selectedProblem.tripId}
//             </p>
//             <p>
//               <strong>Plate Number:</strong> {selectedProblem.plateNumber}
//             </p>
//             <p>
//               <strong>GPS Mounted Date:</strong>{" "}
//               {selectedProblem.gpsMountedDate}
//             </p>
//             <p>
//               <strong>Trip Starting Date:</strong>{" "}
//               {selectedProblem.tripStartingDate}
//             </p>
//             <p>
//               <strong>From-To:</strong> {selectedProblem.fromto}
//             </p>
//             <p>
//               <strong>Driver Name:</strong>{" "}
//               {selectedProblem.driver[0].driverName}
//             </p>
//             <p>
//               <strong>Driver ID:</strong> {selectedProblem.driver[0].driverId}
//             </p>
//             <p>
//               <strong>Driver Phone Number:</strong>{" "}
//               {selectedProblem.driver[0].phoneNumber}
//             </p>
//           </div>
//           <br />
//           <h4 className="redColor theProblem">
//             <strong>Details:</strong> {selectedProblem.Details}
//           </h4>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Problems;

import React, { useEffect, useState } from "react";

import { filterDriveridPlatenumberTripId } from "./filterDriveridPlatenumberTripId";
import { Button } from "@mui/material";
import axios from "axios";

const Problems = () => {
  const [filterText, setFilterText] = useState("");
  const [problems, setProblems] = useState([]); // Store all problems
  const [selectedProblem, setSelectedProblem] = useState(null);

  // Fetch data based on the selected problem ID
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/trip-detail/Objects`
      );
      setProblems(response.data);
      setFilterText("");
    } catch (err) {
      if (err.response) {
        const errorMessage =
          err.response.data.errorMessage || "Error fetching problem details";
        alert(errorMessage);
      } else {
        alert("Network error: Unable to reach the server.");
      }
    }
  };
  console.log("selectedProblem", selectedProblem);

  useEffect(() => {
    fetchData();
  }, []);

  // Handle problem selection
  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setFilterText(""); // Clear the filter text to hide the dropdown
  };

  // Filter problems based on the input
  const filteredProblems = filterDriveridPlatenumberTripId(
    problems,
    filterText
  );

  return (
    <div>
      {/* Filter Input */}
      <div className="filters">
        <label className="textcenter formSectionTitles greenTitle">
          Enter (TripId, PlateNumber or driverId){" "}
          <span className="boldTitle">To See details</span>
        </label>
        <br />
        <input
          placeholder="Trip ID, plate Number, Driver Id"
          type="text"
          className="inputFilter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      {/* Dropdown for filtered Problems */}
      {filterText && filteredProblems.length > 0 && (
        <ul className="dropdown">
          {filteredProblems.map((problem) => (
            <li key={problem.id} onClick={() => handleSelectProblem(problem)}>
              <Button variant="text" color="primary">
                {`${problem.tripTicketId} ${problem.vehicle.plateNumber}`}
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* need to be hidden */}
      {/* Display full details of selected Problem after the user select the item*/}
      {selectedProblem && (
        <div className="problem-details-Container">
          <h2 className="title textcenter marginTB redColor borderBottom">
            Problem Details
          </h2>
          <br />
          <div className="problem-details">
            <p>
              <strong>Trip ID:</strong> {selectedProblem.tripTicketId}
            </p>
            <p>
              <strong>Plate Number:</strong>
              {selectedProblem.vehicle?.plateNumber}
            </p>
            <p>
              <strong>GPS Mounted Date:</strong>{" "}
              {selectedProblem.gpsMountedDate}
            </p>
            <p>
              <strong>Trip Started on:</strong>{" "}
              {selectedProblem.tripStartingDate}
            </p>
            <p>
              <strong>From-To:</strong> {selectedProblem.startingPoint} -{" "}
              {selectedProblem.destination}
            </p>
            <p>
              <strong>Driver Name:</strong> {selectedProblem.driver?.firstName}{" "}
              {selectedProblem.driver?.lastName}
            </p>
            <p>
              <strong>Driver ID:</strong> {selectedProblem.driver?.driverId}
            </p>
            <p>
              <strong>Driver Phone Number:</strong>{" "}
              {selectedProblem.driver?.phoneNumber}
            </p>
          </div>
          <br />
          <h4 className="redColor theProblem">
            <strong>Details:</strong>
            {selectedProblem.problems?.description}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Problems;
