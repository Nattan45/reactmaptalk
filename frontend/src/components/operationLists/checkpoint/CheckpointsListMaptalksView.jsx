import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as maptalks from "maptalks";
import {
  MAP_LAT,
  MAP_LONG,
  MAP_ZOOM,
  MAP_MINZOOM,
} from "../../maptalks/maptalksConstants";

const CheckpointsListMaptalksView = ({ selectedCheckpointId }) => {
  const [checkpoint, setCheckpoint] = useState(null); // Store fetched checkpoint data
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // Fetch checkpoint data by checkpointId
  useEffect(() => {
    const fetchCheckpointData = async () => {
      if (selectedCheckpointId) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/getCheckpoint/mongo/getCheckpointByCheckpointID/${selectedCheckpointId}`
          );
          setCheckpoint(response.data.checkpoints[0]); // returns undefined

          console.log("Fetched data:", response.data);

          console.log(
            "From CheckpointsListMaptalksView",
            response.data.checkpoints
          );
        } catch (error) {
          console.error("Error fetching checkpoint data:", error);
        }
      } else {
        setCheckpoint(null); // Clear checkpoint if no ID is selected
      }
    };

    fetchCheckpointData();
  }, [selectedCheckpointId]);

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

      // Add or update the checkpoint polygon
      if (checkpoint) {
        const lowerLeft = [
          checkpoint.lowerLeft.longitude,
          checkpoint.lowerLeft.latitude,
        ];
        const upperRight = [
          checkpoint.upperRight.longitude,
          checkpoint.upperRight.latitude,
        ];
        const rectangleCoordinates = [
          lowerLeft,
          [upperRight[0], lowerLeft[1]],
          upperRight,
          [lowerLeft[0], upperRight[1]],
          lowerLeft,
        ];

        const vectorLayer = new maptalks.VectorLayer("vector").addTo(
          mapInstance.current
        );

        const rectangle = new maptalks.Polygon(rectangleCoordinates, {
          symbol: {
            lineColor: checkpoint.lineColor, // Default color
            lineWidth: checkpoint.lineWidth, // Default width
            polygonFill: checkpoint.polygonFill, // Default fill
            polygonOpacity: checkpoint.polygonOpacity, // Default opacity
          },
        });

        rectangle.addTo(vectorLayer);
        mapInstance.current.fitExtent(rectangle.getExtent());
      }
    };

    const center = checkpoint
      ? [
          (checkpoint.lowerLeft.latitude + checkpoint.upperRight.latitude) / 2,
          (checkpoint.lowerLeft.longitude + checkpoint.upperRight.longitude) /
            2,
        ]
      : defaultCenter;

    initializeMap(center);
  }, [checkpoint]);

  // Focus the map component whenever selectedCheckpointId changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedCheckpointId]);

  return (
    <div>
      <div ref={mapRef} style={{ width: "70vw", height: "80vh" }} />
    </div>
  );
};

export default CheckpointsListMaptalksView;
