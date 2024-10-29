module.exports = {
  // Users Endpoints __________________________________________
  // Users Registration / Signup
  USERSIGNUP: "/auth/signup", // get list, post

  // Users home route
  USERSLIST: "/users", // get list, post

  // get users list with id - Small Data
  USERLISTID: "/users/userIdList",

  // get all users list - Contains ID
  USERSIDLIST: "/users/userDataList",

  // put method to update the user data
  USERUPDATE: "",
  // remove user account
  DELETEUSERS: "/users",

  // Driver Endpoints __________________________________________
  // drivers home route
  DRIVERSLIST: "/drivers", // get list, post

  // get all Drivers list - Contains ID
  DRIVERSIDLIST: "/drivers/driverIdList",

  // Vehicle Endpoints __________________________________________
  // VehicleS home route
  VEHICLESLIST: "/vehicles", // get list, post, delete

  // get all VehicleS list - Contains ID
  VEHICLESIDLIST: "/vehicles/vehicleIdList",

  VEHICLEUPDATE: "/vehicles/:id/update",

  // Rfid Endpoints __________________________________________
  // Rfids home route
  RFIDKEYSLIST: "/rfidkey", // get list, post, delete

  // get all Rfids list - Contains ID
  RFIDKEYSIDLIST: "/rfidkey/rfidkeyIdList",

  RFIDKEYFROMKEYCODE: "/rfidkey/rfidkey-exists",

  // E-Seal Endpoints __________________________________________
  // E-Seal home route
  ESEALSLIST: "/eseal", // get list, delete

  // get all E-Seal list - Contains ID
  ESEALSIDLIST: "/eseal/electronicSealIdList",

  // create/ get/ PUT eseal with rfid and vehicle forenkey
  CREATEESEAL: "/esealinfo",

  // Route Endpoints __________________________________________
  // Route home route
  ROUTELIST: "/route",
};
