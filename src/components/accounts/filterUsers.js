// to filterout the users
export const filterUsers = (users, filterText) => {
  return users.filter((user) => {
    const username = user.username.toLowerCase();
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const userId = user.userId.toLowerCase();
    const department = user.department.toLowerCase();
    const phone = user.phoneNumber.toLowerCase();
    const email = user.email.toLowerCase();
    const role = user.role.toLowerCase();

    return (
      username.includes(filterText.toLowerCase()) ||
      fullName.includes(filterText.toLowerCase()) ||
      userId.includes(filterText.toLowerCase()) ||
      department.includes(filterText.toLowerCase()) ||
      phone.includes(filterText.toLowerCase()) ||
      email.includes(filterText.toLowerCase()) ||
      role.includes(filterText.toLowerCase())
    );
  });
};
