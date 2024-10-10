import React, { useState } from "react";
import UserAccounts from "../../data/UserAccounts";
import { filterUsers } from "./filterUsers";
import UpdateAccountsPopup from "./UpdateAccountsPopup";
import { Button } from "@mui/material";

const UpdateAccounts = () => {
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState(UserAccounts);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup visibility

  // Handle user selection and clear the filter text
  const handleSelectUser = (user) => {
    setSelectedUser(user); // Set the selected user
    setFilterText(""); // Clear filter text after selection
    setIsPopupOpen(true); // Open the popup
  };

  // Filter users based on the input
  const filteredUsers = filterUsers(userList, filterText);

  return (
    <div>
      {/* Filter Input */}
      <div className="filters">
        <label className="textcenter formSectionTitles greenTitle">
          Enter the User Details to{" "}
          <span className="boldTitle">Update Account</span>
        </label>
        <br />
        <input
          placeholder="Name, ID, phone, email ..."
          type="text"
          className="inputFilter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      {/* Dropdown for filtered users */}
      {filterText && filteredUsers.length > 0 && (
        <ul className="dropdown">
          {filteredUsers.map((user) => (
            <li key={user.id} onClick={() => handleSelectUser(user)}>
              <Button variant="text" color="primary">
                {`${user.firstName} ${user.lastName} (${user.username})`}
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Show the popup if a user is selected */}
      {selectedUser && (
        <UpdateAccountsPopup
          open={isPopupOpen} // Pass the popup visibility state
          user={selectedUser}
          onClose={() => setIsPopupOpen(false)} // Close popup
          onUpdate={(updatedUser) => {
            // Update user in the list after editing
            setUserList(
              userList.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              )
            );
            setIsPopupOpen(false); // Close the popup after update
          }}
        />
      )}
    </div>
  );
};

export default UpdateAccounts;
