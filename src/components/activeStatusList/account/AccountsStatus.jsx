import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import AllAccounts from "./AllAccounts";
import AdminAccountList from "./AdminAccountList";
import OperatorAccountList from "./OperatorAccountList";

const AccountsStatus = () => {
  const location = useLocation(); // Hook to get the current location and its state
  const OperatorsRef = useRef(null); // Ref to track the OperatorsRef section
  const AllusersRef = useRef(null);

  useEffect(() => {
    if (location.state) {
      // If focusOnInactive is true, scroll to Operators
      if (location.state.focusOnInactive && OperatorsRef.current) {
        setTimeout(() => {
          OperatorsRef.current.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }

      // If focusOnAllUsers is true, scroll to Allusers
      if (location.state.focusOnAllUsers && AllusersRef.current) {
        setTimeout(() => {
          AllusersRef.current.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location.state]);

  return (
    <div>
      <div className="gridJustifyCenter">
        <AdminAccountList />
        <div className="flexRowCenter" ref={OperatorsRef}>
          <OperatorAccountList />
        </div>
        <div className="fitWidth" ref={AllusersRef}>
          <AllAccounts />
        </div>
      </div>
      <h2 className="tableDataHeaderTitle inactiveColor">
        Active Users Comming Soon
      </h2>
    </div>
  );
};

export default AccountsStatus;
