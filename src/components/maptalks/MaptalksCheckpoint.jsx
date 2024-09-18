import React, { useEffect, useRef, useState } from "react";

import * as maptalks from "maptalks";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, yellow } from "@mui/material/colors";

import { calculateAreaOfRectangle } from "./calculateAreaOfRectangle";

const MaptalksCheckpoint = () => {
  const mapRef = useRef(null); // Ref to store the map DOM element
  const mapInstance = useRef(null); // Ref to store the map instance
  const drawing = useRef(false); // useRef to store drawing state
  const startPoint = useRef(null); // useRef to store start point
  const currentShape = useRef(null); // Ref to store the current drawn shape
  const layerRef = useRef(null); // Ref to store the layer
  const shapesRef = useRef([]); // Array to store all drawn shapes

  // State to store the coordinates and area of the rectangles
  const [rectangleData, setRectangleData] = useState([]);

  const [rectangleNames, setRectangleNames] = useState({}); // State to track rectangle names

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

  // Handle mouse move event to update the shape as the user drags the mouse
  const handleMouseMove = (e) => {
    if (!drawing.current || !startPoint.current || e.domEvent.shiftKey) return;

    const endPoint = e.coordinate.toArray(); // Get the current point during drag
    // console.log("Mouse Move at", endPoint); // Debug end point

    // Check for NaN values
    if (endPoint.some(isNaN) || startPoint.current.some(isNaN)) {
      console.error("Invalid coordinates:", startPoint.current, endPoint);
      return;
    }

    // Clear previous shape before drawing a new one
    if (currentShape.current) {
      layerRef.current.removeGeometry(currentShape.current);
    }

    // Calculate the lower-left and upper-right corners for the rectangle
    const lowerLeft = [
      Math.min(startPoint.current[0], endPoint[0]),
      Math.min(startPoint.current[1], endPoint[1]),
    ];

    const upperRight = [
      Math.max(startPoint.current[0], endPoint[0]),
      Math.max(startPoint.current[1], endPoint[1]),
    ];

    // console.log("lowerLeft", lowerLeft, "upperRight", upperRight); // Debug coordinates

    // Ensure valid coordinates before creating the polygon
    if (lowerLeft.some(isNaN) || upperRight.some(isNaN)) {
      console.error("Invalid polygon coordinates:", lowerLeft, upperRight);
      return;
    }

    // Define the four corners of the rectangle
    const polygonCoordinates = [
      [lowerLeft[0], lowerLeft[1]], // Bottom-left
      [lowerLeft[0], upperRight[1]], // Top-left
      [upperRight[0], upperRight[1]], // Top-right
      [upperRight[0], lowerLeft[1]], // Bottom-right
      [lowerLeft[0], lowerLeft[1]], // Closing the polygon
    ];

    // Create the polygon using the calculated coordinates
    currentShape.current = new maptalks.Polygon(polygonCoordinates, {
      symbol: {
        lineColor: "#34495e",
        lineWidth: 2,
        polygonFill: "#34495e",
        polygonOpacity: 0.4,
      },
    });

    // console.log("Shape added:", currentShape.current); // Debug shape

    layerRef.current.addGeometry(currentShape.current); // Add the shape to the layer
  };

  // Handle mouse up event to finish drawing
  const handleMouseUp = (e) => {
    // Ignore if the shift key is pressed
    if (e.domEvent.shiftKey) {
      return;
    }

    const endPoint = e.coordinate.toArray(); // Get the current end point

    // Calculate the lower-left and upper-right corners for the rectangle
    const lowerLeft = [
      Math.min(startPoint.current[0], endPoint[0]),
      Math.min(startPoint.current[1], endPoint[1]),
    ];

    const upperRight = [
      Math.max(startPoint.current[0], endPoint[0]),
      Math.max(startPoint.current[1], endPoint[1]),
    ];

    // Calculate the area of the rectangle
    const area = calculateAreaOfRectangle(lowerLeft, upperRight);
    // const formattedArea = `${area.toFixed(2)} m²`; // Format the area and add the unit
    // console.log(formattedArea);

    // Store the rectangle's coordinates and area in the state
    setRectangleData((prevData) => [
      ...prevData,
      { lowerLeft, upperRight, area },
    ]);

    drawing.current = false; // Set drawing mode to false
    startPoint.current = null; // Reset the starting point
    mapInstance.current.config("draggable", true); // Re-enable map dragging

    // Store the current shape into the shapes array
    if (currentShape.current) {
      shapesRef.current.push(currentShape.current); // Save the shape in the array
    }

    currentShape.current = null; // Clear the current shape reference
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

  // Handle name change
  const handleNameChange = (index, newName) => {
    setRectangleNames((prevNames) => ({
      ...prevNames,
      [index]: newName, // Update the name for the specific rectangle
    }));
  };

  // Handle Save button click
  const handleSave = () => {
    rectangleData.forEach((data, index) => {
      const rectangleName = rectangleNames[index] || `Rectangle ${index + 1}`; // Use custom name or fallback to default
      console.log(`Rectangle Name: ${rectangleName}`);
      console.log(`Lower Left: ${data.lowerLeft.join(", ")}`);
      console.log(`Upper Right: ${data.upperRight.join(", ")}`);
      console.log(
        `Area: ${data.area ? `${data.area.toFixed(2)} m²` : "No area data"}`
      );
    });
  };

  return (
    <div className="matalksContainer">
      <div className="sideBySide">
        <div className="left placeAtTop">
          <div className="leftdata pinops">
            <Stack spacing={2}>
              <Button>
                <p className="sentencebutton">
                  <b className="sentencebutton colorRed">NB</b> &nbsp;
                  Checkpoints are drawn in rectangle
                </p>
              </Button>

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
                    Checkpoint
                  </Button>
                </ThemeProvider>

                {/* Display rectangle data */}
                <div className="pindata">
                  <div className="margintop3">
                    {rectangleData.map((data, index) => (
                      <div key={index}>
                        {" "}
                        <div className="CpTitle">
                          <input
                            className="center"
                            type="text"
                            placeholder={`Rectangle ${index + 1}`}
                            value={rectangleNames[index] || ""} // Controlled input
                            onChange={(e) =>
                              handleNameChange(index, e.target.value)
                            } // Update name on change
                          />
                        </div>
                        <Button variant="text">
                          <p className="darkWhiteColor">
                            <span className="block">
                              Lower Left: {data.lowerLeft.join(", ")}
                            </span>
                            <span className="block">
                              Upper Right: {data.upperRight.join(", ")}
                            </span>

                            <span className="block">
                              <span className="areaGreen">Area:</span>
                              {data.area
                                ? `${data.area.toFixed(2)} m²`
                                : "No area data"}
                            </span>
                          </p>
                        </Button>
                      </div>
                    ))}
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

export default MaptalksCheckpoint;

// ### Explanation

// 1. **Define Rectangle as Polygon**:
//    The rectangle is defined as a `Polygon` with four vertices:
//    - Bottom-left
//    - Top-left
//    - Top-right
//    - Bottom-right
//    - Closing the polygon by returning to the bottom-left

// 2. **Coordinate Order**:
//    Ensure that the coordinates are in `[longitude, latitude]` format and that the polygon is closed by repeating the first vertex at the end.

// 3. **Debugging**:
//    Make sure to log coordinates and shapes to verify that they are correct before adding them to the map.

// 4. **Layer Management**:
//    Remove any existing shapes from the layer before adding the new one to avoid overlaps and ensure the latest shape is displayed.

// Using `maptalks.Polygon` is a flexible approach since it allows you to define shapes with more than four sides if needed in the future.
