import React, { useEffect, useRef, useState } from "react";

import * as maptalks from "maptalks";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Select, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, yellow } from "@mui/material/colors";

import { calculatePolygonDetails } from "./calculatePolygonDetails";

const MaptalksWarehouse = () => {
  const mapRef = useRef(null); // Ref to store the map DOM element
  const mapInstance = useRef(null); // Ref to store the map instance
  const drawing = useRef(false); // useRef to store drawing state
  const startPoint = useRef(null); // useRef to store start point
  const currentShape = useRef(null); // Ref to store the current drawn shape
  const layerRef = useRef(null); // Ref to store the layer
  const shapesRef = useRef([]); // Array to store all drawn shapes

  // const [isOpen, setIsOpen] = useState(false);
  const [allPolygonData, setAllPolygonData] = useState([]); // Store all polygon data

  const [sides, setSides] = useState(5); // Default to 6 sides (hexagon)
  const sidesRef = useRef(sides); // Create a ref to store sides
  // Update sidesRef whenever sides state changes
  useEffect(() => {
    sidesRef.current = sides;
  }, [sides]);

  // Handle mouse down event when user starts drawing
  const handleMouseDown = (e) => {
    // Ignore drawing when the shift key is pressed for zooming/panning
    if (e.domEvent.shiftKey) {
      return;
    }
    drawing.current = true; // Set drawing mode to true
    startPoint.current = e.coordinate.toArray(); // Save the starting point
    // console.log("Mouse Down at", startPoint.current); // Debug starting point
    mapInstance.current.config("draggable", false); // Disable map dragging while drawing
  };

  // Handle mouse up event to finish drawing
  const handleMouseUp = (e) => {
    // Ignore if the shift key is pressed
    if (e.domEvent.shiftKey) {
      return;
    }

    drawing.current = false; // Set drawing mode to false
    startPoint.current = null; // Reset the starting point
    mapInstance.current.config("draggable", true); // Re-enable map dragging

    // Store the current shape into the shapes array
    if (currentShape.current) {
      shapesRef.current.push(currentShape.current); // Save the shape in the array

      // Get the polygon's coordinates and update the state
      const rawCoordinates = currentShape.current.getCoordinates()[0];

      // Transform object coordinates into an array of [x, y] (longitude, latitude)
      const coordinates = rawCoordinates.map((coord) => [coord.x, coord.y]);

      const polygonDetails = calculatePolygonDetails(coordinates);

      // console.log("coordinates", coordinates);

      // Store the sides with polygon details
      setAllPolygonData((prevData) => [
        ...prevData,
        {
          id: prevData.length + 1,
          sides: sidesRef.current, // Store the sides at the time of drawing
          area: polygonDetails.area, // Store the area
          unit: polygonDetails.unit, // Store the area
          coordinates, // Store the transformed coordinates
        },
      ]);

      currentShape.current = null; // Clear the current shape reference
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing.current || !startPoint.current) return;

    const endPoint = e.coordinate.toArray(); // Get the current point during drag

    // Check for NaN values
    if (endPoint.some(isNaN) || startPoint.current.some(isNaN)) {
      console.error("Invalid coordinates:", startPoint.current, endPoint);
      return;
    }

    // Clear previous shape before drawing a new one
    if (currentShape.current) {
      layerRef.current.removeGeometry(currentShape.current);
    }

    // Get the latest sides value from sidesRef
    const numberOfSides = sidesRef.current;
    // console.log("Number of sides (ref):", numberOfSides); // Check if sidesRef is updated

    const angleStep = (2 * Math.PI) / numberOfSides;

    // Calculate the radius and center for the polygon
    const radius = Math.sqrt(
      Math.pow(endPoint[0] - startPoint.current[0], 2) +
        Math.pow(endPoint[1] - startPoint.current[1], 2)
    );
    const center = startPoint.current;

    // Generate polygon coordinates
    const polygonCoordinates = [];
    for (let i = 0; i < numberOfSides; i++) {
      const angle = i * angleStep;
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      polygonCoordinates.push([x, y]);
    }
    // Close the polygon by repeating the first coordinate
    polygonCoordinates.push(polygonCoordinates[0]);

    // Create the polygon using the calculated coordinates
    currentShape.current = new maptalks.Polygon(polygonCoordinates, {
      symbol: {
        lineColor: "#34495e",
        lineWidth: 2,
        polygonFill: "#34495e",
        polygonOpacity: 0.4,
      },
    });

    layerRef.current.addGeometry(currentShape.current); // Add the shape to the layer

    // console.log("sides", sides);
  };

  // Handle resetting the last drawn shape
  const resetLastShape = () => {
    if (shapesRef.current.length > 0) {
      const lastShape = shapesRef.current.pop(); // Remove the last shape from the array
      layerRef.current.removeGeometry(lastShape); // Remove the shape from the map layer
      console.log("Removed last shape");
    } else {
      console.log("No shapes to remove");
    }
  };

  // useEffect to initialize the map and attach event listeners
  useEffect(() => {
    const defaultCenter = [39.7823, 9.145]; // Default map center coordinates

    // Function to initialize the map with center and zoom level
    const initializeMap = (center, zoom = 10) => {
      if (mapInstance.current) {
        mapInstance.current.remove(); // Remove the previous map instance if any
      }

      // Create a new map instance
      mapInstance.current = new maptalks.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          subdomains: ["a", "b", "c"],
          attribution: "© OpenStreetMap contributors",
        }),
      });

      // Add a vector layer to hold drawn shapes
      layerRef.current = new maptalks.VectorLayer("vector").addTo(
        mapInstance.current
      );

      // Attach event listeners for drawing
      mapInstance.current.on("mousedown", handleMouseDown);
      mapInstance.current.on("mousemove", handleMouseMove);
      mapInstance.current.on("mouseup", handleMouseUp);
    };

    // Get saved coordinates from session storage
    const getSavedCoordinates = () => {
      const savedCoords = sessionStorage.getItem("userCoordinates");
      return savedCoords ? JSON.parse(savedCoords) : null;
    };

    // Save user's coordinates to session storage
    const saveCoordinates = (coordinates) => {
      sessionStorage.setItem("userCoordinates", JSON.stringify(coordinates));
    };

    // Initialize the map with user or default coordinates
    const userCenter = getSavedCoordinates();
    if (userCenter) {
      initializeMap(userCenter, 16); // Use saved coordinates if available
    } else if (navigator.geolocation) {
      // Use geolocation if available
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserCenter = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          saveCoordinates(newUserCenter); // Save the new user coordinates
          initializeMap(newUserCenter, 16); // Initialize map with user coordinates
        },
        () => {
          initializeMap(defaultCenter, 10); // Fall back to default if geolocation fails
        }
      );
    } else {
      initializeMap(defaultCenter, 10); // Fall back to default if no coordinates available
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove(); // Clean up the map on component unmount
      }
    };
  }, []); // Empty dependency array ensures map initialization happens only once

  const handleSidesChange = (event) => {
    setSides(Number(event.target.value));
  };

  const theme = createTheme({
    palette: {
      primary: blue,
      secondary: yellow,
    },
  });

  const resetToMyLocation = () => {
    const savedCoords = sessionStorage.getItem("userCoordinates");
    if (savedCoords) {
      const userCenter = JSON.parse(savedCoords);
      mapInstance.current.setCenter(userCenter);
      mapInstance.current.setZoom(16); // Reset zoom to a closer view
    } else {
      alert("User location not available.");
    }
  };

  const [polygonNames, setPolygonNames] = useState({}); // State to track Polygon names

  // Handle name change
  const handleNameChange = (index, newName) => {
    setPolygonNames((prevNames) => ({
      ...prevNames,
      [index]: newName, // Update the name for the specific polygon
    }));
  };

  // Updated handleSave function
  const handleSave = () => {
    const polygonDataWithNames = allPolygonData.map((polygon, index) => {
      const userInputName = polygonNames[index] || ""; // Get user input or default to empty
      const formattedName = userInputName
        ? `${userInputName} ${polygon.sides}-sided polygon` // Format with sides
        : `Polygon ${index + 1} (${polygon.sides}-sided polygon)`; // Default name if no input

      return {
        ...polygon,
        PolygonName: formattedName, // Use the formatted name
      };
    });

    console.log(
      "All drawn Polygon's with Their Saved Names:",
      polygonDataWithNames
    );
  };

  return (
    <div className="matalksContainer">
      <div className="sideBySide">
        <div className="left placeAtTop">
          <div className="leftdata pinops">
            <Stack spacing={2}>
              <Button>
                <p className="sentencebutton">
                  <b className="sentencebutton colorRed">NB</b> &nbsp; Choose
                  the Polygon Sides
                </p>
              </Button>

              <Select
                value={sides}
                onChange={handleSidesChange}
                className="polygonsList"
              >
                <MenuItem value={3}>Triangle</MenuItem>
                <MenuItem value={5}>Pentagon</MenuItem>
                <MenuItem value={6}>Hexagon</MenuItem>
                <MenuItem value={9}>Nonagon</MenuItem>
              </Select>

              {/* reset the last shape */}
              <Button variant="outlined" onClick={resetLastShape}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-undo"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
                &nbsp; &nbsp;
                <span className="sentencebutton">Reset Shape</span>
              </Button>

              <Button
                variant="outlined"
                onClick={resetToMyLocation}
                color="primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin-check-inside"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <path d="m9 10 2 2 4-4" />
                </svg>
                &nbsp; &nbsp;{" "}
                <span className="sentencebutton">Reset To My Location</span>
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
                    Warehouse
                  </Button>
                </ThemeProvider>
                <div className="pindata">
                  <div className="margintop3 margintop5">
                    {allPolygonData.length > 0 ? (
                      allPolygonData.map((polygon, index) => (
                        <div key={polygon.id} className="margintop5">
                          <div className="CpTitle">
                            <input
                              className="center"
                              type="text"
                              placeholder={`Polygon ${index + 1}: ${
                                polygon.sides
                              }-sided polygon`}
                              value={polygonNames[index] || ""} // Controlled input
                              onChange={(e) =>
                                handleNameChange(index, e.target.value)
                              } // Update name on change
                            />
                          </div>

                          <span className="areaGreen">
                            Area: {polygon.area} {polygon.unit}
                          </span>
                          <details className="coordinatesDetail">
                            <summary>Coordinates</summary>
                            <ul style={{ textAlign: "center" }}>
                              {" "}
                              {/* Center the text */}
                              {polygon.coordinates.map((coord, idx) => (
                                <li key={idx}>
                                  <span className="coordinateColor1">
                                    x: {coord[0]}
                                  </span>
                                  , <br />{" "}
                                  <span className="coordinateColor2">
                                    y: {coord[1]}
                                  </span>{" "}
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      ))
                    ) : (
                      <p>No polygons drawn yet.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="buttontop">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
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
    </div>
  );
};

export default MaptalksWarehouse;
