import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  MAP_LAT,
  MAP_LONG,
  MAP_ZOOM,
  MAP_MINZOOM,
} from "../../maptalks/maptalksConstants";
import * as maptalks from "maptalks";

const RouteListMaptalksView = ({ selectedRouteId }) => {
  const [route, setRoute] = useState(null); // Store fetched route data
  const mapRef = React.useRef(null);
  const mapInstance = React.useRef(null);

  //   const defaultLatitude = parseFloat(process.env.REACT_APP_LAT);
  //   const defaultLongitude = parseFloat(process.env.REACT_APP_LONG);

  // Fetch route data by routeId
  useEffect(() => {
    const fetchRouteData = async () => {
      if (selectedRouteId) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/getRoutes/mongo/getRoutesByRouteID/${selectedRouteId}`
          );
          setRoute(response.data.routes[0]); // Assuming the response is an array
          // console.log(response.data.routes[0]);
          console.log("Fetched data:", response.data);
        } catch (error) {
          console.error("Error fetching route data:", error);
        }
      } else {
        setRoute(null); // Clear route if no ID is selected
      }
    };

    fetchRouteData();
  }, [selectedRouteId]);

  // Initialize the map with route data
  // useEffect(() => {
  //   if (route) {
  //     const coordinates = route.routeCoordinates.map((coord) => [
  //       coord.latitude,
  //       coord.longitude,
  //     ]); // Map to array of lat/lng pairs

  //     const initializeMap = (center, zoom = 10) => {
  //       if (mapInstance.current) {
  //         mapInstance.current.remove();
  //       }

  //       mapInstance.current = new maptalks.Map(mapRef.current, {
  //         center: center,
  //         zoom: zoom,
  //         minZoom: 3, // set map's min zoom
  //         baseLayer: new maptalks.TileLayer("base", {
  //           urlTemplate: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  //           subdomains: ["a", "b", "c"],
  //           attribution: "Vehicle Tracking",
  //         }),
  //       });

  //       // Create a new vector layer for the route line
  //       const vectorLayer = new maptalks.VectorLayer("vector").addTo(
  //         mapInstance.current
  //       );

  //       // Add the route polyline to the map
  //       const routeLine = new maptalks.LineString(coordinates).setOptions({
  //         symbol: {
  //           lineColor: route.lineColor,
  //           lineWidth: route.lineWidth,
  //         },
  //       });

  //       routeLine.addTo(vectorLayer);

  //       // Optionally zoom the map to the route extent
  //       mapInstance.current.fitExtent(routeLine.getExtent());
  //     };

  //     // Use the first coordinate as default center
  //     const defaultCenter = [coordinates[0][0], coordinates[0][1]];

  //     // If no route is selected, use default coordinates
  //     //   const defaultCenter = route
  //     //     ? [
  //     //         route.routeCoordinates[0].longitude,
  //     //         route.routeCoordinates[0].latitude,
  //     //       ] // Use first route coordinate
  //     //     : [defaultLongitude, defaultLatitude]; // Use default coordinates

  //     initializeMap(defaultCenter); // Center the map at the first coordinate

  //     //   initializeMap([coordinates[0][0], coordinates[0][1]]); // Center the map at the first coordinate
  //   }
  //   //   }, [route, defaultLongitude, defaultLatitude]);
  // }, [route]);

  useEffect(() => {
    const defaultCenter = [MAP_LAT, MAP_LONG];

    const initializeMap = (center) => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }

      mapInstance.current = new maptalks.Map(mapRef.current, {
        center: center,
        zoom: MAP_ZOOM,
        minZoom: MAP_MINZOOM,
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          subdomains: ["a", "b", "c"],
          attribution: "Vehicle Tracking",
        }),
      });

      if (route) {
        const coordinates = route.routeCoordinates.map((coord) => [
          coord.latitude,
          coord.longitude,
        ]);

        const vectorLayer = new maptalks.VectorLayer("vector").addTo(
          mapInstance.current
        );

        const routeLine = new maptalks.LineString(coordinates).setOptions({
          symbol: {
            lineColor: route.lineColor || "#34495e",
            lineWidth: route.lineWidth || 4,
          },
        });

        routeLine.addTo(vectorLayer);
        mapInstance.current.fitExtent(routeLine.getExtent());
      }
    };

    const center = route
      ? [
          route.routeCoordinates[0].latitude,
          route.routeCoordinates[0].longitude,
        ]
      : defaultCenter;

    initializeMap(center);
  }, [route]);

  return (
    <div>
      <div ref={mapRef} style={{ width: "70vw", height: "80vh" }} />
    </div>
  );
};

export default RouteListMaptalksView;
