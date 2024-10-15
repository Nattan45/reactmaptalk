import React, { useEffect, useState } from "react";

import Paginator from "../../paginator/Paginator";
import axios from "axios";
import MessagePopup from "../../messageComponent/MessagePopup";
import { Button, createTheme, ThemeProvider } from "@mui/material";

const AllVehiclesDataTable = () => {
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

        // sort the vehicles in ASSIGNED > PENDING > WAITING order
        const sortVehicleData = (vehicles) => {
          const order = {
            ASSIGNED: 1,
            PENDING: 2,
            WAITING: 3,
          };

          return vehicles.sort((a, b) => {
            return order[a.vehicleStatus] - order[b.vehicleStatus];
          });
        };

        // When setting the vehicle data after fetching
        setVehicleData(sortVehicleData(Vehicles.data));
        // setVehicleData(Vehicles.data);
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

  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      ASSIGNED: createColor("#2e5736"),
      WAITING: createColor("#D20103"),
      PENDING: createColor("#FFA500"),
    },
  });

  return (
    <div>
      <h2 className="tableDataHeaderTitle">
        All {vehicleData.length} Vehicles Status
      </h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Vehicle Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Plate Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((vehicle, key) => (
              <tr key={key}>
                <td>{vehicle.vehicleName}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.plateNumber}</td>
                <td>
                  <ThemeProvider theme={theme}>
                    {vehicle.vehicleStatus === "ASSIGNED" ? (
                      <Button
                        variant="contained"
                        color={"ASSIGNED"}
                        className="smallbutton"
                      >
                        Assigned
                      </Button>
                    ) : vehicle.vehicleStatus === "PENDING" ? (
                      <Button
                        variant="contained"
                        color={"PENDING"}
                        className="smallbutton"
                      >
                        Pending
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color={"WAITING"}
                        className="smallbutton"
                      >
                        Waiting
                      </Button>
                    )}
                  </ThemeProvider>
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

export default AllVehiclesDataTable;
