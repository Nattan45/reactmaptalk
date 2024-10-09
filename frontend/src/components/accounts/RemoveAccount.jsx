import React, { useState } from "react";

import Button from "@mui/material/Button";
import UserAccounts from "../../data/UserAccounts"; // user data
import { filterUsers } from "./filterUsers"; // filter function for user data

const RemoveAccount = () => {
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState(UserAccounts);

  const handleSelectUser = (user) => {
    setSelectedUser(user); // Set the selected user when chosen
    setFilterText(""); // Reset the filter text
  };

  const handleRemoveUser = (id) => {
    setUserList(userList.filter((user) => user.id !== id)); // Remove the selected user
    setSelectedUser(null); // Clear selection after removal
  };

  const filteredUsers = filterUsers(userList, filterText);

  return (
    <div>
      {/* Filter Input */}
      <div className="filters">
        <label className="textcenter formSectionTitles redTitle">
          Enter the User Details to{" "}
          <span className="boldTitle">Delete Account</span>
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

      {/* Display selected user in card */}
      {selectedUser && (
        <div className="form heightfit">
          <label className="textcenter formSectionTitles">Selected User</label>

          <p className="input">
            <strong>Name:</strong>{" "}
            {`${selectedUser.firstName} ${selectedUser.lastName}`}
          </p>
          <p>
            <strong>Username:</strong> {selectedUser.username}
          </p>
          <p>
            <strong>Phone:</strong> {selectedUser.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>User ID:</strong> {selectedUser.userId}
          </p>
          <p>
            <strong>Location:</strong> {selectedUser.accountlocation}
          </p>
          <p>
            <strong>Department:</strong> {selectedUser.department}
          </p>
          <Button
            variant="text"
            color="error"
            onClick={() => handleRemoveUser(selectedUser.id)}
          >
            Remove User
          </Button>
        </div>
      )}
    </div>
  );
};

export default RemoveAccount;
