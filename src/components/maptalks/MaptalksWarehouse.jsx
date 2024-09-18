import React, { useEffect, useRef, useState } from "react";

import * as maptalks from "maptalks";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Select, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, yellow } from "@mui/material/colors";

const MaptalksWarehouse = () => {
  const mapRef = useRef(null); // Ref to store the map DOM element
  const mapInstance = useRef(null); // Ref to store the map instance
  const drawing = useRef(false); // useRef to store drawing state
  const startPoint = useRef(null); // useRef to store start point
  const currentShape = useRef(null); // Ref to store the current drawn shape
  const layerRef = useRef(null); // Ref to store the layer
  const shapesRef = useRef([]); // Array to store all drawn shapes

  const [sides, setSides] = useState(6); // Default to 6 sides (hexagon)

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

    // const endPoint = e.coordinate.toArray(); // Get the current end point

    // // Calculate the lower-left and upper-right corners for the rectangle
    // const lowerLeft = [
    //   Math.min(startPoint.current[0], endPoint[0]),
    //   Math.min(startPoint.current[1], endPoint[1]),
    // ];

    // const upperRight = [
    //   Math.max(startPoint.current[0], endPoint[0]),
    //   Math.max(startPoint.current[1], endPoint[1]),
    // ];

    // Calculate the area of the rectangle
    // const area = calculateAreaOfRectangle(lowerLeft, upperRight);
    // const formattedArea = `${area.toFixed(2)} m²`; // Format the area and add the unit
    // console.log(formattedArea);

    // Store the rectangle's coordinates and area in the state
    // setRectangleData((prevData) => [
    //   ...prevData,
    //   { lowerLeft, upperRight, area },
    // ]);

    drawing.current = false; // Set drawing mode to false
    startPoint.current = null; // Reset the starting point
    mapInstance.current.config("draggable", true); // Re-enable map dragging

    // Store the current shape into the shapes array
    if (currentShape.current) {
      shapesRef.current.push(currentShape.current); // Save the shape in the array
    }

    currentShape.current = null; // Clear the current shape reference
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

    // Use the selected number of sides for the polygon
    const numberOfSides = sides; // Dynamically use the selected sides
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

              <Select value={sides} onChange={handleSidesChange}>
                <MenuItem value={3}>Triangle</MenuItem>
                <MenuItem value={5}>Pentagon</MenuItem>
                <MenuItem value={6}>Hexagon</MenuItem>
                <MenuItem value={9}>Nonagon</MenuItem>
                {/* Add more options as needed */}
              </Select>

              {/* Add the onClick handler to reset the last shape */}
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

                <div className="pindata">cp</div>
              </div>
              <div className="buttontop">
                <Button variant="contained" color="success">
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
