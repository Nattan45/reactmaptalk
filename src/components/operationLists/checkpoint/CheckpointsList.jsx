import React, { useEffect, useState } from "react";

import "./checkpoints.css";
import Paginator from "../../paginator/Paginator";
import CheckpointsCategoryList from "./CheckpointsCategoryList";
import CheckpointsData from "../../../data/CheckpointsData"; // Multi-checkpoint data
import CheckpointData from "../../../data/CheckpointData"; // Single checkpoint data

const CheckpointsList = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    // Combine single checkpoint data into the same structure as the multiple checkpoint data
    const combinedData = [
      ...CheckpointsData,
      {
        categoryName: "", // Category name for the single checkpoint
        checkpointList: CheckpointData, // Use the array of single checkpoint data
      },
    ];

    setDeviceData(combinedData); // Load the combined data into state
  }, []);

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deviceData.slice(indexOfFirstItem, indexOfLastItem); // Slice the data based on current page

  // Calculate the total number of pages
  const totalPages = Math.ceil(deviceData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  const [totalCheckpoints, setTotalCheckpoints] = useState(0); // State for total checkpoints

  useEffect(() => {
    // Calculate the total number of checkpoints
    const totalFromCheckpointsData = CheckpointsData.reduce(
      (total, category) => {
        return total + category.checkpointList.length;
      },
      0
    );

    const totalFromCheckpointData = CheckpointData.length;

    // Set total number of checkpoints
    setTotalCheckpoints(totalFromCheckpointsData + totalFromCheckpointData);
  }, []);

  return (
    <div className="gridCenter">
      <div className="checkpintsList fitContent">
        <h2 className="tableDataHeaderTitle ">
          All {totalCheckpoints} Checkpoints Status
        </h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Checkpoint Name</th>
              <th>Category Name</th>
              <th>Coordinates</th>
              <th>Area</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((category, idx) => (
                <React.Fragment key={idx}>
                  {category.checkpointList.map((checkpoint, checkpointIdx) => (
                    <tr key={checkpointIdx}>
                      <td>{checkpoint.RectangleName}</td>
                      <td>{category.categoryName || ""}</td>{" "}
                      <td>
                        Lower Left: {checkpoint.LowerLeft[0].toFixed(5)},{" "}
                        {checkpoint.LowerLeft[1].toFixed(5)} <br />
                        Upper Right: {checkpoint.UpperRight[0].toFixed(5)},{" "}
                        {checkpoint.UpperRight[1].toFixed(5)}
                      </td>
                      <td>{checkpoint.Area}</td>
                      <td>
                        {/* Edit and Delete icons */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-file-pen-line"
                        >
                          <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                          <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                          <path d="M8 18h1" />
                        </svg>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ff0000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash-2"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
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
      <CheckpointsCategoryList />
    </div>
  );
};

export default CheckpointsList;
