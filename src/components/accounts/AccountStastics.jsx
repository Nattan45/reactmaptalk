import React from "react";
import ActiveUsers from "../activeStatusCards/ActiveUsers";
import TotalAccounts from "../activeStatusCards/TotalAccountsStatus";
import AdminAccountStatus from "../activeStatusCards/AdminAccountStatus";
import OperatorAccountStatus from "../activeStatusCards/OperatorAccountStatus";

const AccountStastics = () => {
  return (
    <div className="DeviceStasticsContainer fourCardRowContainer">
      {/* actives */}
      <TotalAccounts />

      {/* Admin Account */}
      <AdminAccountStatus />

      {/* Operators */}
      <OperatorAccountStatus />

      {/* ActiveAccounts */}
      <ActiveUsers />
    </div>
  );
};

export default AccountStastics;
