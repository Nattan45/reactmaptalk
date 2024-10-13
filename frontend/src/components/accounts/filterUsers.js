// to filterout the users
export const filterUsers = (users, filterText) => {
  return users.filter((user) => {
    // const username = user.username.toLowerCase();
    const firstName = user.firstName || "";
    const userId = user.userId || "";
    const department = user.department || "";
    const phone = user.phoneNumber || "";
    const email = user.email || "";
    const role = user.role || "";

    return (
      // username.includes(filterText) ||
      firstName.includes(filterText) ||
      userId.includes(filterText) ||
      department.includes(filterText) ||
      phone.includes(filterText) ||
      email.includes(filterText) ||
      role.includes(filterText)
    );
  });
};
