import React, { useEffect, useState } from "react";

import Paginator from "../../paginator/Paginator";
import axios from "axios";
import MessagePopup from "../../messageComponent/MessagePopup";
// import { useNavigate } from "react-router-dom";
import RouteListMaptalksView from "./RouteListMaptalksView";

const RouteList = () => {
  // const navigate = useNavigate(); // For redirecting
  const [deviceData, setDeviceData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

  const [visibleCategory, setVisibleCategory] = useState(null); // State to control the visibility of each category's checkpoints list

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
        const RouteData = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/get/mongo/getRoutes`
        );

        setDeviceData(RouteData.data.routes);
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

  const [selectedRouteId, setSelectedRouteId] = useState(null);
  // const [routeCoordinates, setRouteCoordinates] = useState([]);

  const viewRouteOnMaptalks = (selectedRouteId) => {
    setSelectedRouteId(selectedRouteId); // Update state
    // setRouteCoordinates(routeCoordinates); // Update state
  };

  const deleteRoute = (selectedRouteId) => {
    console.log("deleteRoute", selectedRouteId);
  };

  return (
    <div className="gridCenter">
      <div className="checkpintsList fitContent">
        <h2 className="tableDataHeaderTitle ">
          {deviceData.length}&nbsp;Route List Found
        </h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Route Name</th>
              <th>Route Number</th>
              <th>Coordinates</th>
              <th>Total Distance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((route, idx) => (
                <tr key={idx}>
                  <td>{route.routeName}</td>
                  <td>{route.routeId}</td>
                  <td>
                    <div className="categoryHeader">
                      <div className="categoryInfo">
                        <p>{route.routeCoordinates.length} points</p>
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
                    <div className="checkpointItem">
                      {visibleCategory === idx && (
                        <div className="checkpointsList ">
                          {route.routeCoordinates.map((coordinate, index) => (
                            <p key={index}>
                              [{coordinate.latitude.toFixed(5)},{" "}
                              {coordinate.longitude.toFixed(5)}]
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{route.totalDistanceKm} km</td>
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
                      onClick={() => viewRouteOnMaptalks(route.routeId)}
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    {/* Delete icon */}
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
                      onClick={() => deleteRoute(route.routeId)}
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </td>
                </tr>
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

      {selectedRouteId && (
        <RouteListMaptalksView
          selectedRouteId={selectedRouteId}
          // routeCoordinates={routeCoordinates}
        />
      )}

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default RouteList;
