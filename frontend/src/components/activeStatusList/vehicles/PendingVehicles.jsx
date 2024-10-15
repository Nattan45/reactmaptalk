import React, { useEffect, useState } from "react";

import Paginator from "../../paginator/Paginator";
import axios from "axios";
import MessagePopup from "../../messageComponent/MessagePopup";
import { Button, Stack, createTheme, ThemeProvider } from "@mui/material";
// import Button from "@mui/material/Button";

const PendingVehicles = () => {
  const [vehicleData, setVehicleData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page

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
        const Vehicles = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/vehicles`
        );

        setVehicleData(Vehicles.data); // Load the dummy data into state
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

    fetchData(); // Call the fetch function
  }, []);

  const InactiveVehicles = vehicleData.filter(
    (vehicle) => vehicle.vehicleStatus === "PENDING"
  );

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = InactiveVehicles.slice(
    indexOfFirstItem,
    indexOfLastItem
  ); // Slice the data based on current page

  // Calculate the total number of pages
  const totalPages = Math.ceil(InactiveVehicles.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      activate: createColor("#2e5736"),
    },
  });
  return (
    <div>
      <h2 className="tableDataHeaderTitle PendingColor">
        {InactiveVehicles.length} Pending Vehicles
      </h2>
      <table border="1" cellPadding="10" className="inactivedevicesTable">
        <thead className="inactivedevicesTable-header">
          <tr>
            <th>Trip ID</th>
            <th>Vehicle Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Plate Number</th>
            <th>Driver Id</th>
            <th>Driver Phone</th>
            <th>Route Name</th>
            <th>Road Number</th>
            <th>Gps Tag</th>
            <th>Checkpoints</th>
            <th>Ops</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((vehicle, key) => (
              <tr key={key}>
                <td></td>
                <td>{vehicle.vehicleName}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.plateNumber}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Stack direction="row" spacing={2}>
                    <ThemeProvider theme={theme}>
                      {/* Activate Trip svg */}
                      <Button
                        variant="contained"
                        color={"activate"}
                        className="smallbutton"
                        onClick={() => {
                          // Proceed with the deletion
                          // handelDelete(vehicle.id);
                        }}
                      >
                        <span className="sentencebutton">
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#fff"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M8.57385 20.3523L11.9553 13.5894C11.9737 13.5526 12.0263 13.5526 12.0447 13.5894L15.4261 20.3523C15.4483 20.3965 15.3996 20.4426 15.3566 20.4181L12.0248 18.5142C12.0094 18.5054 11.9906 18.5054 11.9752 18.5142L8.64338 20.4181C8.60043 20.4426 8.55173 20.3965 8.57385 20.3523Z"
                                stroke="#fff"
                                strokeLinecap="round"
                              />
                              <path
                                d="M20.5 18.5L16.5 3.5"
                                stroke="#fff"
                                strokeLinecap="round"
                              />
                              <path
                                d="M3.5 18.5L7.5 3.5"
                                stroke="#fff"
                                strokeLinecap="round"
                              />
                              <path
                                d="M12 10.5V8.5"
                                stroke="#fff"
                                strokeLinecap="round"
                              />
                              <path
                                d="M12 5.5V3.5"
                                stroke="#fff"
                                strokeLinecap="round"
                              />
                            </g>
                          </svg>
                        </span>
                      </Button>

                      {/* cancle Trip svg  */}
                      <Button
                        variant="contained"
                        color={"error"}
                        className="smallbutton"
                        onClick={() => {
                          // Proceed with the deletion
                          // handelDelete(vehicle.id);
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 -0.5 17 17"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xlink="http://www.w3.org/1999/xlink"
                          className="si-glyph si-glyph-deny"
                          fill="#fff"
                          stroke="#fff"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          <g id="SVGRepo_iconCarrier">
                            <title>799</title> <defs> </defs>
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <path
                                d="M9.016,0.06 C4.616,0.06 1.047,3.629 1.047,8.029 C1.047,12.429 4.615,15.998 9.016,15.998 C13.418,15.998 16.985,12.429 16.985,8.029 C16.985,3.629 13.418,0.06 9.016,0.06 L9.016,0.06 Z M3.049,8.028 C3.049,4.739 5.726,2.062 9.016,2.062 C10.37,2.062 11.616,2.52 12.618,3.283 L4.271,11.631 C3.508,10.629 3.049,9.381 3.049,8.028 L3.049,8.028 Z M9.016,13.994 C7.731,13.994 6.544,13.583 5.569,12.889 L13.878,4.58 C14.571,5.555 14.982,6.743 14.982,8.028 C14.981,11.317 12.306,13.994 9.016,13.994 L9.016,13.994 Z"
                                fill="#fff"
                                className="si-glyph-fill"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </Button>
                    </ThemeProvider>
                  </Stack>
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

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default PendingVehicles;
