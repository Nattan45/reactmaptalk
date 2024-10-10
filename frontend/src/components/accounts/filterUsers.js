// to filterout the users
export const filterUsers = (users, filterText) => {
  return users.filter((user) => {
    // const username = user.username.toLowerCase();
    const fullName = `${user.firstName} ${user.lastName}`;
    const userId = user.userId;
    const department = user.department;
    const phone = user.phoneNumber;
    const email = user.email;
    const role = user.role;

    return (
      // username.includes(filterText) ||
      fullName.includes(filterText) ||
      userId.includes(filterText) ||
      department.includes(filterText) ||
      phone.includes(filterText) ||
      email.includes(filterText) ||
      role.includes(filterText)
    );
  });
};
