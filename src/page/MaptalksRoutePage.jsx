import React from "react";

import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import MaptalksRoute from "../components/maptalks/MaptalksRoute";

const MaptalksRoutePage = () => {
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
