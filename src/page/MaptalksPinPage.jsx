import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import Maptalks from "../components/maptalks/MaptalksPin";

const MaptalksPinPage = () => {
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
          <Maptalks />
        </div>
      </div>

      {/* Footer-Container */}
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};

export default MaptalksPinPage;
