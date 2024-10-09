import React from "react";

import { useParams } from "react-router-dom";
import ProblemData from "../data/Problem";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import ProblemDetailsTable from "../components/trip/ProblemDetailsTable";

const ProblemDetails = () => {
  const { id } = useParams(); // Get the id from the URL
  const problem = ProblemData.find((p) => p.id === parseInt(id));

  if (!problem) {
    return <p>No problem found.</p>;
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
            <h2 className="title textcenter marginTB redColor borderBottom">
              Problem Details
            </h2>
            <div className="problem-details">
              <p>
                <strong>Trip ID:</strong> {problem.tripId}
              </p>
              <p>
                <strong>Plate Number:</strong> {problem.plateNumber}
              </p>
              <p>
                <strong>Driver:</strong>{" "}
                {problem.driver
                  .map((d) => `${d.driverName} (${d.driverId})`)
                  .join(", ")}
              </p>
              <p>
                <strong>GPS Mounted Date:</strong> {problem.gpsMountedDate}
              </p>
              <p>
                <strong>Trip Starting Date:</strong> {problem.tripStartingDate}
              </p>
              <p>
                <strong>From/To:</strong> {problem.fromto}
              </p>
            </div>
            <h4 className="redColor theProblem">
              <strong>Details:</strong> {problem.Details}
            </h4>

            <div className="eSeal-details">
              <h4 className="textcenter marginTB">
                <u>Gps Tracker Information</u>
              </h4>
              <div className="eSeal-details-data">
                {problem.eSeal.length > 0 ? (
                  problem.eSeal.map((seal) => (
                    <div key={seal.id} className="eSeal-problem-data">
                      <h4>{seal.deviceName}</h4>
                      <p>
                        <strong>Brand:</strong> {seal.brand}
                      </p>
                      <p>
                        <strong>GPS ID:</strong> {seal.gpsId}
                      </p>
                      <p>
                        <strong>Battery:</strong> {seal.battery}%
                      </p>
                      <p>
                        <strong>Status:</strong> {seal.status}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No eSeal information available.</p>
                )}
              </div>
            </div>
          </div>
          <ProblemDetailsTable />
        </div>
      </div>

      {/* Footer-Container */}
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};

export default ProblemDetails;
