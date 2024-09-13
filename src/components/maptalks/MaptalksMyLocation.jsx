import React, { useEffect, useRef, useState } from "react";

import * as maptalks from "maptalks"; //npm i maptalks --save
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

const MaptalksMyLocation = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Ref to store the map instance
  const markerLayerRef = useRef(null); // Ref for marker layer
  const [locationDenied, setLocationDenied] = useState(false); // To handle location denied

  const [Longitude, setLongitude] = useState(null);
  const [Latitude, setLatitude] = useState(null);

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
    markerLayerRef.current = new maptalks.VectorLayer("markerLayer").addTo(
      mapInstance.current
    );
  };

  const addMarker = (coords) => {
    // Custom SVG marker without base64 encoding
    const userLocationSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fa0000" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-check-inside"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="m9 10 2 2 4-4"/></svg>`;

    // Create a marker at the user location using the SVG directly
    const marker = new maptalks.Marker(coords, {
      symbol: {
        markerFile: `data:image/svg+xml,${encodeURIComponent(userLocationSvg)}`,
        textFaceName: "sans-serif",
        textFill: "#34495e",
        textHorizontalAlignment: "center",
        textSize: 40,
      },
    });
    marker.addTo(markerLayerRef.current);

    // Set longitude and latitude state
    setLongitude(coords[0]);
    setLatitude(coords[1]);

    // Log the coordinates to the console
    console.log(
      `User location: Longitude: ${coords[0]}, Latitude: ${coords[1]}`
    );
  };

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

  useEffect(() => {
    const defaultCenter = [39.7823, 9.145]; // Ethiopian coordinates [Longitude, Latitude] 38.853055, 9.044590

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
      addMarker(userCenter); // Add the marker for the saved location
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserCenter = [
            position.coords.longitude,
            position.coords.latitude,
          ];

          // Save coordinates
          saveCoordinates(newUserCenter);

          // Initialize map and add marker at user's location
          initializeMap(newUserCenter, 16);
          addMarker(newUserCenter); // Add marker for current position
        },
        () => {
          setLocationDenied(true); // Set location denied to true if permission denied
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

  // marteial Ui
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF5733",
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: yellow,
    },
  });

  return (
    <div className="matalksContainer">
      <div className="sideBySide">
        <div className="left">
          <div className="leftdata card">
            <div className="card2">
              <ThemeProvider theme={theme}>
                <Button color="secondary">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffff00"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin-check-inside"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <path d="m9 10 2 2 4-4" />
                  </svg>
                  &nbsp; &nbsp; Current Location
                </Button>
              </ThemeProvider>
              <hr className="shorthr" />
              <Stack direction="row" spacing={2}>
                <ThemeProvider theme={theme}>
                  <Button variant="text" color="secondary">
                    Longitude: {Longitude}
                  </Button>
                  <Button variant="text" color="secondary">
                    Latitude: {Latitude}
                  </Button>
                </ThemeProvider>
              </Stack>
            </div>
          </div>

          <div className="resetLocation">
            {locationDenied ? (
              <div style={{ color: "red", marginTop: "10px" }}>
                Could not display user's location.
              </div>
            ) : (
              <ThemeProvider theme={theme}>
                <Button
                  variant="outlined"
                  onClick={resetToMyLocation}
                  color="primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffb700"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-undo"
                  >
                    <path d="M3 7v6h6" />
                    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                  </svg>
                  &nbsp; &nbsp; Reset To My Location
                </Button>
              </ThemeProvider>
            )}
          </div>
        </div>

        <div className="right">
          <div ref={mapRef} style={{ width: "70vw", height: "80vh" }} />
        </div>
      </div>
    </div>
  );
};

export default MaptalksMyLocation;
