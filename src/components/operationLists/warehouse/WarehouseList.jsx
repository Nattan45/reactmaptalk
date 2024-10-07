import React, { useEffect, useState } from "react";

import Paginator from "../../paginator/Paginator";
import WarehousesData from "../../../data/WarehousesData"; // Multi-Warehouses data
import WarehouseData from "../../../data/WarehouseData"; // Single Warehouse data
import WarehousesCategoryList from "./WarehousesCategoryList";

const WarehouseList = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  const [visibleCategory, setVisibleCategory] = useState(null); // State to control the visibility of each category's checkpoints list

  useEffect(() => {
    // Combine single warehouse data into the same structure as the multiple warehouse data
    const combinedData = [
      ...WarehousesData.map((category) => ({
        ...category,
        warehouseList: category.warehouseList || [], // Ensure it exists
      })),
      {
        categoryName: "", // Add a category for single warehouse
        warehouseList: WarehouseData, // Use the single warehouse data
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

  const [totalWarehouses, setTotalWarehouses] = useState(0); // State for total warehouses

  useEffect(() => {
    // Calculate the total number of warehouses
    const totalFromWarehousesData = WarehousesData.reduce((total, category) => {
      return (
        total + (category.warehouseList ? category.warehouseList.length : 0)
      );
    }, 0);

    const totalFromWarehouseData = WarehouseData.length;

    // Set total number of warehouses
    setTotalWarehouses(totalFromWarehousesData + totalFromWarehouseData);
  }, []);

  // Function to toggle the visibility of a category's checkpoints list
  const toggleCategoryVisibility = (index) => {
    setVisibleCategory(visibleCategory === index ? null : index);
  };

  return (
    <div className="gridCenter">
      <div className="checkpintsList fitContent">
        <h2 className="tableDataHeaderTitle ">
          All {totalWarehouses} Warehouses Status
        </h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Warehouse Name</th>
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
                  {category.warehouseList.map((warehouse, warehouseIdx) => (
                    <tr key={warehouseIdx}>
                      <td>{warehouse.PolygonName}</td>
                      <td>{category.categoryName || ""}</td>
                      <td className="">
                        <div className="categoryHeader">
                          <div className="categoryInfo">
                            <p>{warehouse.sides} Side</p>
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
                              toggleCategoryVisibility(warehouseIdx)
                            }
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                        {visibleCategory === warehouseIdx && (
                          <div className="checkpointsList">
                            {warehouse.coordinates.map((coordinate, index) => (
                              <div key={index}>
                                [{coordinate[0].toFixed(5)},{" "}
                                {coordinate[1].toFixed(5)}]
                              </div>
                            ))}
                          </div>
                        )}
                      </td>

                      <td>
                        {warehouse.area} {warehouse.unit}
                      </td>
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
                <td colSpan="6">No data available</td>
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
      <WarehousesCategoryList />
    </div>
  );
};

export default WarehouseList;
