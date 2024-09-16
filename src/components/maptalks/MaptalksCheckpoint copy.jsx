import React, { useEffect, useRef, useState } from "react";

import * as maptalks from "maptalks";
import Stack from "@mui/material/Stack"; // npm install @mui/material @emotion/react @emotion/styled
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, yellow } from "@mui/material/colors";

const MaptalksCheckpoint = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Ref for the map instance
  const [drawing, setDrawing] = useState(false); // Track if user is drawing
  const [shapeType, setShapeType] = useState(null); // Track selected shape type
  const [startPoint, setStartPoint] = useState(null); // Starting point of the shape
  const layerRef = useRef(null); // Reference for the layer to add shapes

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

      // Add a vector layer for drawing shapes
      layerRef.current = new maptalks.VectorLayer("vector").addTo(
        mapInstance.current
      );

      // Add map event listeners
      mapInstance.current.on("mousedown", handleMouseDown);
      mapInstance.current.on("mousemove", handleMouseMove);
      mapInstance.current.on("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e) => {
      if (!shapeType) return; // Do nothing if no shape is selected
      setDrawing(true);
      setStartPoint(e.coordinate.toArray()); // Set the start point
    };

    const handleMouseMove = (e) => {
      if (!drawing || !shapeType || !startPoint) return;

      // Clear previous shapes from the layer
      layerRef.current.clear();

      const endPoint = e.coordinate.toArray(); // Get current mouse position
      let shape;

      if (shapeType === "rectangle") {
        shape = new maptalks.Rectangle(startPoint, endPoint, {
          symbol: {
            lineColor: "#34495e",
            lineWidth: 2,
            polygonFill: "#34495e",
            polygonOpacity: 0.4,
          },
        });
      } else if (shapeType === "circle") {
        const radius = maptalks.Geometry.distance(startPoint, endPoint); // Use distance as radius
        shape = new maptalks.Circle(startPoint, radius, {
          symbol: {
            lineColor: "#34495e",
            lineWidth: 2,
            polygonFill: "#1bbc9b",
            polygonOpacity: 0.4,
          },
        });
      } else if (shapeType === "ellipse") {
        const rx = Math.abs(startPoint[0] - endPoint[0]);
        const ry = Math.abs(startPoint[1] - endPoint[1]);
        shape = new maptalks.Ellipse(startPoint, rx, ry, {
          symbol: {
            lineColor: "#34495e",
            lineWidth: 2,
            polygonFill: "rgb(216,115,149)",
            polygonOpacity: 0.4,
          },
        });
      }

      layerRef.current.addGeometry(shape); // Add shape to the layer
    };

    const handleMouseUp = () => {
      setDrawing(false); // Stop drawing
      setStartPoint(null); // Reset the start point
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
  }, [shapeType]);

  // Function to handle shape selection
  const handleShapeSelect = (shape) => {
    setShapeType(shape);
  };

  // material Ui theme
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
              <Button
                variant="outlined"
                onClick={() => handleShapeSelect("rectangle")}
              >
                Draw Rectangle
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleShapeSelect("circle")}
              >
                Draw Circle
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleShapeSelect("ellipse")}
              >
                Draw Ellipse
              </Button>

              <Button variant="outlined" onClick={() => setShapeType(null)}>
                Reset Shape
              </Button>

              <Button variant="outlined">Remove Last Cp</Button>
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

                {/* Display route coordinates in the pindata div */}
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

export default MaptalksCheckpoint;
