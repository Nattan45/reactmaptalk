import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as maptalks from "maptalks";
import {
  MAP_LAT,
  MAP_LONG,
  MAP_ZOOM,
  MAP_MINZOOM,
} from "../../maptalks/maptalksConstants";

const WarehousesListMaptalksView = ({ selectedWarehouseId }) => {
  const [warehouse, setWarehouse] = useState(null); // Store fetched warehouse data
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // Fetch warehouse data by warehouseId
  useEffect(() => {
    const fetchWarehouseData = async () => {
      if (selectedWarehouseId) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/getWarehouses/mongo/getWarehousesByWarehouseId/${selectedWarehouseId}`
          );
          setWarehouse(response.data.warehouse[0]); // Assuming `warehouses` is an array
        } catch (error) {
          console.error("Error fetching warehouse data:", error);
        }
      } else {
        setWarehouse(null); // Clear warehouse data if no ID is selected
      }
    };

    fetchWarehouseData();
  }, [selectedWarehouseId]);

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

      // Add or update the warehouse polygon
      if (warehouse) {
        const warehouseCoordinates = warehouse.warehouseCoordinates.map(
          (coord) => [coord.longitude, coord.latitude]
        );

        const vectorLayer = new maptalks.VectorLayer("vector").addTo(
          mapInstance.current
        );

        const polygon = new maptalks.Polygon(warehouseCoordinates, {
          symbol: {
            lineColor: warehouse.lineColor, // Default color
            lineWidth: warehouse.lineWidth, // Default width
            polygonFill: warehouse.polygonFill, // Default fill
            polygonOpacity: warehouse.polygonOpacity, // Default opacity
          },
        });

        polygon.addTo(vectorLayer);
        mapInstance.current.fitExtent(polygon.getExtent());
      }
    };

    const center = warehouse
      ? [
          warehouse.warehouseCoordinates.reduce(
            (sum, coord) => sum + coord.latitude,
            0
          ) / warehouse.warehouseCoordinates.length,
          warehouse.warehouseCoordinates.reduce(
            (sum, coord) => sum + coord.longitude,
            0
          ) / warehouse.warehouseCoordinates.length,
        ]
      : defaultCenter;

    initializeMap(center);
  }, [warehouse]);

  // Focus the map component whenever selectedWarehouseId changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedWarehouseId]);

  return (
    <div>
      <div ref={mapRef} style={{ width: "70vw", height: "80vh" }} />
    </div>
  );
};

export default WarehousesListMaptalksView;
