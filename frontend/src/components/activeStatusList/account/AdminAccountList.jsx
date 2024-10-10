import React, { useEffect, useState } from "react";

import UserAccounts from "../../../data/UserAccounts"; // user data
import Paginator from "../../paginator/Paginator";
import UpdateAccountPopup from "../../accounts/UpdateAccountsPopup"; // Import the update component

const AdminAccountList = () => {
  const [userData, setUserData] = useState([]); // State for the full data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [user, setUser] = useState(null); // State for selected user
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control the modal

  useEffect(() => {
    const fetchData = async () => {
      setUserData(UserAccounts); // Load the dummy data into state
    };

    fetchData(); // Call the fetch function
  }, []);

  const allUsers = userData.filter((user) => user.role === "Admin");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allUsers.slice(indexOfFirstItem, indexOfLastItem); // Slice the filtered data based on current page
  const totalPages = Math.ceil(allUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Set the new page number
  };

  const handleEditClick = (user) => {
    setUser(user); // Set the selected user
    setIsEditModalOpen(true); // Open the modal
  };

  const handleSave = (updatedUser) => {
    // Find index of the user in the userData array
    const updatedUserData = userData.map((u) =>
      u.userId === updatedUser.userId ? updatedUser : u
    );
    setUserData(updatedUserData);
  };

  return (
    <div>
      <h2 className="tableDataHeaderTitle activeColor">Admin Accounts List</h2>
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
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.userId}</td>
              <td>{user.department}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file-pen"
                  onClick={() => handleEditClick(user)}
                >
                  <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginator Component */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Update Account Modal */}
      <UpdateAccountPopup
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminAccountList;