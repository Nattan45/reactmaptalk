import React from "react";

import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import Vehicles from "../components/vehicle/Vehicles";

const VehiclesPage = () => {
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
        <div className="contentsContainer">
          <Vehicles />
        </div>
      </div>

      {/* Footer-Container */}
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};
export default VehiclesPage;
