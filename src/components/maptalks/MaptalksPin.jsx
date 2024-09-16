import React, { useEffect, useRef, useState } from "react";
import "./maptalks.css";

import * as maptalks from "maptalks"; //npm i maptalks --save
import Stack from "@mui/material/Stack"; // npm install @mui/material @emotion/react @emotion/styled
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, yellow } from "@mui/material/colors";

const MaptalksPin = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Ref to store the map instance
  const markers = useRef([]); // Ref to store all markers

  const [pinplaces, setpinplaces] = useState([]); // Track all pinned places

  const initializeMap = (center, zoomLevel = 10) => {
    // If a map instance already exists, remove it
    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    // Initialize a new map instance and store it in the ref
    mapInstance.current = new maptalks.Map(mapRef.current, {
      center: center,
      zoom: zoomLevel, // Initial zoom level
      baseLayer: new maptalks.TileLayer("base", {
        urlTemplate: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        subdomains: ["a", "b", "c"],
        attribution: "Vehicle Tracking",
      }),
    });

    // Create a vector layer to hold markers
    const markerLayer = new maptalks.VectorLayer("markerLayer").addTo(
      mapInstance.current
    );

    // Add event listener to add markers on map click
    mapInstance.current.on("click", function (e) {
      const clickedCoords = e.coordinate.toArray(); // Get the coordinates [longitude, latitude]

      const pin = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-plus-inside"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="M12 7v6"/><path d="M9 10h6"/></svg>`;
      // Create a marker at the clicked location using the pin SVG
      const marker = new maptalks.Marker(clickedCoords, {
        symbol: {
          // textName: '📍', // Or you can use an image/icon
          // markerFile: `${process.env.PUBLIC_URL}/assets/map/tools/map-pin-svgrepo-com.png`, // Use the PNG image as the marker
          markerFile: `data:image/svg+xml;base64,${btoa(pin)}`, // Encode SVG as base64 data URL
          textFaceName: "sans-serif",
          textFill: "#34495e",
          textHorizontalAlignment: "center",
          textSize: 40,
        },
      });

      // Add the marker to the map
      marker.addTo(markerLayer);

      // Store the marker in the markers array
      markers.current.push(marker);

      // Update the pinned places array
      setpinplaces((prev) => [...prev, clickedCoords]);

      // Log the coordinates or use them as needed
      console.log("Pinned coordinates:", clickedCoords);
    });
  };

  const undoLastMarker = () => {
    if (markers.current.length > 0) {
      // Remove the last marker from the marker layer
      const lastMarker = markers.current.pop();
      lastMarker.remove();

      // Update pinned places by removing the last one
      setpinplaces((prev) => prev.slice(0, -1));

      console.log("Undone last marker.");
    } else {
      console.log("No markers to undo.");
    }
  };

  const clearAllMarkers = () => {
    markers.current.forEach((marker) => marker.remove());
    markers.current = []; // Clear the markers array

    setpinplaces([]); // Clear pinned places
    console.log("Cleared all markers.");
  };

  useEffect(() => {
    const defaultCenter = [39.7823, 9.145]; // Ethiopian coordinates [Longitude, Latitude]

    const saveCoordinates = (coordinates) => {
      sessionStorage.setItem("userCoordinates", JSON.stringify(coordinates));
    };

    const getSavedCoordinates = () => {
      const savedCoords = sessionStorage.getItem("userCoordinates");
      return savedCoords ? JSON.parse(savedCoords) : null;
    };

    const userCenter = getSavedCoordinates();
    if (userCenter) {
      initializeMap(userCenter, 16); // Use saved coordinates
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserCenter = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          saveCoordinates(newUserCenter); // Save coordinates
          initializeMap(newUserCenter, 16); // Set a higher zoom level for street view
        },
        () => {
          initializeMap(defaultCenter); // Use default coordinates if permission denied
        }
      );
    } else {
      initializeMap(defaultCenter); // Use default coordinates if Geolocation API is not available
    }

    // Cleanup function to remove the map when the component is unmounted
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, []);

  // material Ui
  const theme = createTheme({
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 12,
    },
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
              <Button variant="outlined" onClick={undoLastMarker}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#236bfb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-undo"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
                &nbsp; &nbsp; Undo Last
              </Button>
              <Button variant="outlined" onClick={clearAllMarkers}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#236bfb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-rotate-ccw"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                &nbsp; &nbsp; Clear All
              </Button>
            </Stack>
            <div className="card bottomradius bigcard everythingCenter">
              <div className="card2 dynamicheight bottomradius bigcard">
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
                    All Coordinates
                  </Button>
                </ThemeProvider>

                <div className="pindata">
                  <ThemeProvider theme={theme}>
                    <Stack className="">
                      {pinplaces.length > 0 && (
                        <div className="listOfPin">
                          {pinplaces.map((place, index) => (
                            <p key={index}>
                              <Button variant="text" color="secondary">
                                {index + 1}. Longitude: {place[0]}, Latitude:{" "}
                                {place[1]}
                              </Button>
                            </p>
                          ))}
                        </div>
                      )}
                    </Stack>
                  </ThemeProvider>
                </div>
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

export default MaptalksPin;
