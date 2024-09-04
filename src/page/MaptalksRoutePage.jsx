import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import MaptalksRoute from "../components/maptalks/MaptalksRoute";

const MaptalksRoutePage = () => {
  return (
    <div className="App">
      {/* header */}
      <div className="App-header">
        <h1>Header Section</h1>
      </div>

      {/* Page-Container */}
      <div className="pageContainer">
        {/* Side Bar */}
        <div className="sideBar">
          <Sidebar />
          <hr />
        </div>

        {/* All Contents */}
        <div className="contentsContainer">
          <MaptalksRoute />
        </div>
      </div>

      {/* Footer-Container */}
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};

export default MaptalksRoutePage;
