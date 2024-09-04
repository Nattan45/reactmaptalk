import React, { useEffect, useRef, useState } from "react";

import * as maptalks from "maptalks";
import { calculateTotalDistance } from "./calculateDistance";
import Stack from "@mui/material/Stack"; // npm install @mui/material @emotion/react @emotion/styled
import Button from "@mui/material/Button";

const MaptalksRoute = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]); // State to store route coordinates
  const [distance, setDistance] = useState({
    totalDistance: 0,
    totalDistanceKm: 0,
  }); // State to store distance

  useEffect(() => {
    const defaultCenter = [39.7823, 9.145]; // Ethiopian coordinates [Longitude, Latitude]

    const initializeMap = (center, zoom = 10) => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }

      mapInstance.current = new maptalks.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          subdomains: ["a", "b", "c"],
          attribution: "© OpenStreetMap contributors",
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
    console.log("Total Distance (m):", calculatedDistance.totalDistance);
    console.log("Total Distance (km):", calculatedDistance.totalDistanceKm);

    setDistance(calculatedDistance); // Update distance state with the calculated values
  }, [routeCoordinates]);

  return (
    <div className="matalksContainer">
      MaptalksRoute
      <div ref={mapRef} style={{ width: "70vw", height: "80vh" }} />
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          onClick={() => console.log(routeCoordinates)}
        >
          Log Route Coordinates
        </Button>
        <Button variant="outlined">
          Total Distance {distance.totalDistance.toFixed(2)}m /{" "}
          {distance.totalDistanceKm.toFixed(2)}
          km
        </Button>
      </Stack>
    </div>
  );
};

export default MaptalksRoute;
