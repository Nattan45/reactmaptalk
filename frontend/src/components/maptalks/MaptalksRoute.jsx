import React, { useEffect, useRef, useState } from "react";

import * as maptalks from "maptalks";
import { calculateTotalDistance } from "./calculateDistance";
import {
  Stack,
  Button,
  createTheme,
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { blue, yellow } from "@mui/material/colors";
import axios from "axios";
import MessagePopup from "../messageComponent/MessagePopup";

const MaptalksRoute = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]); // State to store route coordinates
  const [distance, setDistance] = useState({
    totalDistance: 0,
    totalDistanceKm: 0,
  }); // State to store distance
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
  const [routeName, setRouteName] = useState(""); // State for route name

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
    const defaultCenter = [39.7823, 9.145]; // Ethiopian coordinates [Longitude, Latitude]

    const initializeMap = (center, zoom = 10) => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }

      mapInstance.current = new maptalks.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        minZoom: 3, // set map's min zoom to
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          subdomains: ["a", "b", "c"],
          attribution: "Vehicle Tracking",
        }),
      });

      // Handle click event to add route points
      mapInstance.current.on("click", (e) => {
        const coords = e.coordinate.toArray();
        setRouteCoordinates((prevCoords) => [...prevCoords, coords]);
      });
    };

    const getSavedCoordinates = () => {
      const savedCoords = sessionStorage.getItem("userCoordinates");
      return savedCoords ? JSON.parse(savedCoords) : null;
    };

    const saveCoordinates = (coordinates) => {
      sessionStorage.setItem("userCoordinates", JSON.stringify(coordinates));
    };

    const userCenter = getSavedCoordinates();

    if (userCenter) {
      initializeMap(userCenter, 16);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserCenter = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          saveCoordinates(newUserCenter);
          initializeMap(newUserCenter, 16);
        },
        () => {
          initializeMap(defaultCenter, 10);
        }
      );
    } else {
      initializeMap(defaultCenter, 10);
    }

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, []);

  // route
  useEffect(() => {
    if (mapInstance.current && routeCoordinates.length > 1) {
      const layerId = "routeLayer";
      let routeLayer = mapInstance.current.getLayer(layerId);

      if (!routeLayer) {
        // Create a new layer if it doesn't exist
        routeLayer = new maptalks.VectorLayer(layerId);
        mapInstance.current.addLayer(routeLayer);
      } else {
        // Clear the existing geometries in the layer
        routeLayer.clear();
      }

      // Create the line with updated coordinates
      const line = new maptalks.LineString(routeCoordinates, {
        symbol: {
          lineColor: "#1bbc9b",
          lineWidth: 4,
        },
      });

      // Add the line to the layer
      routeLayer.addGeometry(line);
    }

    const calculatedDistance = calculateTotalDistance(routeCoordinates);
    // console.log("Total Distance (m):", calculatedDistance.totalDistance);
    // console.log("Total Distance (km):", calculatedDistance.totalDistanceKm);

    setDistance(calculatedDistance); // Update distance state with the calculated values
  }, [routeCoordinates]);

  const removeLastCoordinate = () => {
    setRouteCoordinates((prevCoords) =>
      prevCoords.length > 0
        ? prevCoords.slice(0, prevCoords.length - 1)
        : prevCoords
    );
  };

  // material Ui
  const theme = createTheme({
    palette: {
      primary: blue,
      secondary: yellow,
    },
  });

  const handleSaveClick = () => {
    setDialogOpen(true); // Open the dialog when the Save button is clicked
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
    setRouteName(""); // Clear the input field
  };

  const handleRouteNameChange = (event) => {
    setRouteName(event.target.value); // Update route name state
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Transform routeCoordinates to include latitude and longitude
    const formattedCoordinates = routeCoordinates.map((coord) => ({
      latitude: coord[1], // Ensure you're accessing the correct value for latitude
      longitude: coord[0], // Ensure you're accessing the correct value for longitude
    }));

    const routeData = {
      routeName: routeName,
      // routeCoordinates: routeCoordinates,
      routeCoordinates: formattedCoordinates,
      // totalDistance: distance.totalDistance,
      totalDistanceKm: distance.totalDistanceKm,
    };

    try {
      // Step 1: Send route data to Spring Boot
      const springResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/create/route`,
        routeData
      );

      // Check if Spring Boot successfully saved the route
      if (springResponse.status === 200) {
        addMessage("Route Saved successfully!", "success");
        handleDialogClose(); // Close the dialog after saving

        // Step 2: Save data to MongoDB upon successful Spring Boot response
        const mongoResponse = await axios.post(
          `${process.env.REACT_APP_NODE_API_URL}/api/mongo/createRoute`,
          routeData
        );

        if (mongoResponse.status === 200) {
          addMessage("Route Cached successfully!", "success");
        } else {
          addMessage("Error Caching Route.", "error");
        }
      }
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

    // Log the route data in JSON format
    console.log(JSON.stringify(routeData, null, 2)); // Pretty-print JSON with 2 spaces
  };

  return (
    <div className="matalksContainer">
      <div className="sideBySide">
        <div className="left placeAtTop">
          <div className="leftdata pinops">
            <Stack spacing={2}>
              <Button
                variant="outlined"
                onClick={() => console.log(routeCoordinates)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2f07f2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-scroll-text"
                >
                  <path d="M15 12h-5" />
                  <path d="M15 8h-5" />
                  <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                  <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
                </svg>
                &nbsp; &nbsp; <span className="sentencebutton">Log Route</span>
              </Button>

              <Button variant="outlined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2f07f2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-ruler"
                >
                  <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
                  <path d="m14.5 12.5 2-2" />
                  <path d="m11.5 9.5 2-2" />
                  <path d="m8.5 6.5 2-2" />
                  <path d="m17.5 15.5 2-2" />
                </svg>
                &nbsp; &nbsp;{" "}
                <span className="sentencebutton">Distance &nbsp;</span>{" "}
                {distance.totalDistance.toFixed(2)} m /{" "}
                {distance.totalDistanceKm.toFixed(2)} km
              </Button>

              <Button variant="outlined" onClick={removeLastCoordinate}>
                <span className="sentencebutton">Remove Last Point</span>
              </Button>
            </Stack>
            <div className="card bottomradius bigcard everythingCenter">
              <div className="card2 dynamicheight bottomradius bigcard routeCords">
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    className="buttonbottom"
                    style={{
                      width: "180px",
                      height: "50px",
                    }}
                  >
                    Designed Route
                  </Button>
                </ThemeProvider>

                {/* Display route coordinates in the pindata div */}
                <div className="pindata">
                  <div>
                    {routeCoordinates.length > 0 ? (
                      routeCoordinates.map((coords, index) => (
                        <p className="" key={index}>
                          <Button
                            variant="text"
                            style={{
                              color:
                                index === 0
                                  ? "green" // First coordinate - green
                                  : index === routeCoordinates.length - 1
                                  ? "red" // Last coordinate - red
                                  : "rgb(152, 152, 152)", // All other coordinates - black
                            }}
                          >
                            {index === 0
                              ? `Start Point: X: ${coords[0]}, Y: ${coords[1]}`
                              : index === routeCoordinates.length - 1
                              ? `End Point: X: ${coords[0]}, Y: ${coords[1]}`
                              : `${index + 1}: x: ${coords[0]}, y: ${
                                  coords[1]
                                }`}
                          </Button>
                        </p>
                      ))
                    ) : (
                      <p>No coordinates yet.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="buttontop">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div ref={mapRef} style={{ width: "70vw", height: "80vh" }} />
        </div>
      </div>
      {/* Dialog for entering route name */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Save Route</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your route.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Route Name"
            type="text"
            fullWidth
            variant="outlined"
            value={routeName}
            onChange={handleRouteNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default MaptalksRoute;
