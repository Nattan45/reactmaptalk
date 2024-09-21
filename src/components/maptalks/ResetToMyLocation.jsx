// ResetToMyLocation.js
import React from "react";
import Button from "@mui/material/Button";

const ResetToMyLocation = ({ mapInstance }) => {
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

  return (
    <Button variant="outlined" onClick={resetToMyLocation} color="primary">
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
      &nbsp; &nbsp; <span className="sentencebutton">Reset To My Location</span>
    </Button>
  );
};

export default ResetToMyLocation;
