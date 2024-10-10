import React, { useEffect, useState } from "react";
import Paginator from "../../paginator/Paginator";
import WarehousesData from "../../../data/WarehousesData"; // Multi-Warehouses data

const WarehousesCategoryList = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [visibleCategory, setVisibleCategory] = useState(null); // State to control the visibility of each category's checkpoints list

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setDeviceData(WarehousesData); // Load the dummy data into state
    };
    fetchData(); // Call the fetch function
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

  // Function to toggle the visibility of a warehouse's coordinates list
  const toggleCategoryVisibility = (index) => {
    setVisibleCategory(visibleCategory === index ? null : index);
  };

  return (
    <div className="gridCenter marginTB">
      <div className="checkpintsList fitContent">
        <h2 className="tableDataHeaderTitle ">
          All {deviceData.length} Warehouse
        </h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Warehouse List</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr>
                  <td>{category.categoryName}</td>
                  <td>
                    {category.warehouseList.map((warehouse, warehouseIndex) => (
                      <div key={warehouseIndex} className="categoryContainer">
                        <div className="categoryHeader">
                          <div className="categoryInfo">
                            <p>
                              &nbsp;{warehouse.sides}
                              &nbsp; Side
                            </p>
                          </div>
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
                            onClick={() =>
                              toggleCategoryVisibility(warehouseIndex)
                            }
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                          {/* {visibleCategory === warehouseIndex ? "Hide" : "Show"} */}
                        </div>

                        {visibleCategory === warehouseIndex && (
                          <div className="checkpointsList checkpointItem marginBottom">
                            {warehouse.coordinates.map((coords, idx) => (
                              <div key={idx} className="">
                                <span>
                                  [{coords[0].toFixed(5)},{" "}
                                  {coords[1].toFixed(5)}]
                                </span>
                                <br />
                              </div>
                            ))}
                            <p>
                              <strong className="checkpointsRectangel-Area">
                                Area:
                              </strong>
                              {warehouse.area} {warehouse.unit}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </td>
                  <td>
                    {/* View icon */}
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
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* Edit icon */}
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
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default WarehousesCategoryList;
