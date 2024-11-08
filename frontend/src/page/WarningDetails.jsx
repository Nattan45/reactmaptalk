import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import WarningDetailsTable from "../components/trip/WarningDetailsTable";
import axios from "axios";

const WarningDetails = () => {
  const { id } = useParams(); // Get the id from the URL
  const [trip, setTrip] = useState(null); // State to store trip data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch data based on the id param
    const fetchWarningDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/trip-detail/Objects/${id}`
        );
        setTrip(response.data); // Set fetched data to trip state
      } catch (error) {
        console.error("Error fetching problem details:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchWarningDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!trip || !trip.warnings) {
    return <p>No warning found.</p>;
  }

  return (
    <div className="App">
      {/* header */}
      <div className="App-header">
        <Header />
      </div>

      {/* Page-Container */}
      <div className="pageContainer">
        {/* Side Bar */}
        <div className="sideBar">
          <Sidebar />
        </div>

        {/* All Contents */}
        <div className="contentsContainer gridCenter">
          <div className="detailProblem-container">
            <h2 className="title textcenter marginTB warningColor borderBottom">
              Warning Details
            </h2>
            <div className="problem-details">
              <p>
                <strong>Trip ID:</strong> {trip.tripTicketId}
              </p>
              <p>
                <strong>Plate Number:</strong>
                {trip.vehicle?.plateNumber || "N/A"}
              </p>
              <p>
                <strong>Driver:</strong>{" "}
                {trip.driver
                  ? `${trip.driver.firstName} ${trip.driver.lastName} (${trip.driver.driverId})`
                  : "N/A"}
              </p>
              <p>
                <strong>GPS Mounted Date:</strong>
                {trip.gpsMountedDate || "N/A"}
              </p>
              <p>
                <strong>Trip Started On:</strong>{" "}
                {trip.tripStartingDate || "N/A"}
              </p>
              <p>
                <strong>From/To:</strong>{" "}
                {`${trip.startingPoint || "N/A"} / ${
                  trip.destination || "N/A"
                }`}
              </p>
            </div>
            &nbsp;
            <h4 className="warningColor theProblem">
              <strong>Details:</strong>
              {trip.warnings && trip.warnings.length > 0
                ? trip.warnings.map((warning) => warning.message).join(", ")
                : "No warning found"}
            </h4>
            <div className="eSeal-details">
              <h4 className="textcenter marginTB">
                <u>Gps Tracker Information</u>
              </h4>
              <div className="eSeal-details-data">
                {trip.electronicSealIds && trip.electronicSealIds.length > 0 ? (
                  trip.electronicSealIds.map((seal) => (
                    <div key={seal.id} className="eSeal-problem-data">
                      <h4>{seal.tagName}</h4>
                      <p>
                        <strong>Brand:</strong> {seal.brand}
                      </p>
                      <p></p>
                      <p>
                        <strong>Battery:</strong> {trip.battery || "N/A"} %
                      </p>
                      <p>
                        <strong>Status:</strong> {seal.electronicSealStatus}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No eSeal information available.</p>
                )}
              </div>
            </div>
          </div>
          <WarningDetailsTable />
        </div>
      </div>

      {/* Footer-Container */}
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};

export default WarningDetails;
