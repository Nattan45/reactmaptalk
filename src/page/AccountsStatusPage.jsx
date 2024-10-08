import React from "react";

import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import AccountsStatus from "../components/activeStatusList/account/AccountsStatus";

const AccountsStatusPage = () => {
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
          <AccountsStatus />
        </div>
      </div>

      {/* Footer-Container */}
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};

export default AccountsStatusPage;
