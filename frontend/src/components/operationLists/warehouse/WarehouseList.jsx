import React, { useEffect, useState } from "react";

import Paginator from "../../paginator/Paginator";

import WarehousesCategoryList from "./WarehousesCategoryList";
import axios from "axios";
import MessagePopup from "../../messageComponent/MessagePopup";

const WarehouseList = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  const [visibleCategory, setVisibleCategory] = useState(null); // State to control the visibility of each category's checkpoints list
  const [totalWarehouses, setTotalWarehouses] = useState(0); // State for total warehouses

  // Message Toast
  const [messages, setMessages] = useState([]);
  // Add Message
  const addMessage = (text, type) => {
    const id = Date.now(); // Unique ID based on timestamp
    setMessages((prevMessages) => [...prevMessages, { id, text, type }]);
  };
  // Remove Message
  const removeMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Warehouses = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/warehouse`
        );

        const totalWarehouses = Warehouses.data;
        const totalWarehousesLength = Warehouses.data.length;

        setDeviceData(totalWarehouses);

        console.log(totalWarehouses);

        setTotalWarehouses(totalWarehousesLength);
      } catch (err) {
        if (err.response) {
          const errorMessage =
            err.response.data.errorMessage ||
            err.response.data.message ||
            "An error occurred: 500";
          addMessage(errorMessage, "error");
        } else {
          addMessage("Network error: Unable to reach the server.", "error");
        }
      }
    };

    fetchData();
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
              <th>Warehouse ID</th>
              <th>Coordinates</th>
              <th>Area</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((warehouse, idx) => (
                <React.Fragment key={idx}>
                  <tr key={idx}>
                    <td>{warehouse.warehouseName}</td>
                    <td>{warehouse.warehouseId}</td>
                    <td className="">
                      <div className="categoryHeader">
                        <div className="categoryInfo">
                          <p>{warehouse.side} Side</p>
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
                          onClick={() => toggleCategoryVisibility(idx)}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                      {visibleCategory === idx && (
                        <div className="checkpointsList">
                          {warehouse.warehouseCoordinates.map(
                            (coordinate, index) => (
                              <div key={index}>
                                [{coordinate.latitude.toFixed(5)},
                                {coordinate.longitude.toFixed(5)}]
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </td>

                    <td>
                      {warehouse.area} {warehouse.unit}
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
                      &nbsp;&nbsp;&nbsp;
                      {/* Edit icons */}
                      {/* <svg
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
                        </svg> */}
                      &nbsp;&nbsp;&nbsp;
                      {/* Delete icons */}
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

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default WarehouseList;
