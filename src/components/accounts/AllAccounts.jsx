import React, { useEffect, useState } from "react";

import UserAccounts from "../../data/UserAccounts"; // user data
import { filterUsers } from "./filterUsers"; // filter function for user data
import Paginator from "../paginator/Paginator";

const AllAccounts = () => {
  const [userData, setUserData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [filterText, setFilterText] = useState(""); // State for filtering

  useEffect(() => {
    const fetchData = async () => {
      setUserData(UserAccounts); // Load the dummy data into state
    };

    fetchData(); // Call the fetch function
  }, []);

  // Use the filterUsers function to filter data based on filterText
  const allUsers = filterUsers(userData, filterText); // Filtered users

  // Calculate the current items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allUsers.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered data based on current page

  const totalPages = Math.ceil(allUsers.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle">
        <span></span> All Accounts
      </h2>
      <div className="filters">
        <input
          placeholder="Name, ID, phone, email ..."
          type="text"
          name="text"
          className="inputFilter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        ></input>
      </div>
      <br />
      <table border="1" cellPadding="10" className="activedevicesTable">
        <thead className="activedevicesTable-header">
          <tr>
            <th>User Name</th>
            <th>First name</th>
            <th>Last name</th>
            <th>User ID</th>
            <th>Department</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0
            ? currentItems.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.userId}</td>
                  <td>{user.department}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      {/* Using the Paginator component */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllAccounts;
