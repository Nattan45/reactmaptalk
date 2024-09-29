import React, { useEffect, useRef, useState } from "react";

import * as maptalks from "maptalks";
import TrackParameters from "./TrackParameters";

const Tracker = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Ref to store the map instance
  const markerLayerRef = useRef(null); // Ref for marker layer
  const [locationDenied, setLocationDenied] = useState(false); // To handle location denied

  const initializeMap = (center, zoomLevel = 10) => {
    // If a map instance already exists, remove it
    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    // Initialize a new map instance and store it in the ref
    mapInstance.current = new maptalks.Map(mapRef.current, {
      center: center,
      zoom: zoomLevel, // Initial zoom level
      minZoom: 3, // set map's min zoom to
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

    // Log the coordinates to the console
    console.log(
      `User location: Longitude: ${coords[0]}, Latitude: ${coords[1]}`
    );
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

  return (
    <div className="savedLocationContainer">
      <div className="firstSection">
        <TrackParameters />
      </div>
      <div className="">
        {locationDenied && (
          <div style={{ color: "red", marginTop: "10px" }}>
            Could not display your location.
          </div>
        )}
        Track Vehicles
        <div ref={mapRef} style={{ width: "70vw", height: "60vh" }} />
      </div>
    </div>
  );
};

export default Tracker;
