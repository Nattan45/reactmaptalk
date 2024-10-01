const ActiveVehicle = [
  {
    id: 1,
    tripId: "AA-DR-24522",
    vehicleName: "Toyota ",
    brand: "Brand A",
    model: "Model X",
    plateNumber: "AA-4-13234",
    driverId: "BT-1397",
    eSeal: [
      {
        id: 1,
        deviceName: "Tracker 1",
        brand: "Brand A",
        gpsId: "78675-X",
        rfidKeys: [
          {
            id: 2,
            RfidKey: "56753",
            status: "occupied",
          },
          {
            id: 4,
            RfidKey: "56753",
            status: "occupied",
          },
        ],
        status: "Active",
        vehicle: "AA-13694-4",
      },
      {
        id: 4,
        deviceName: "Tracker 4",
        brand: "Brand A",
        gpsId: "58675-X",
        rfidKeys: [
          {
            id: 7,
            RfidKey: "7227",
            status: "occupied",
          },
          {
            id: 9,
            RfidKey: "9993",
            status: "occupied",
          },
          {
            id: 10,
            RfidKey: "2352",
            status: "occupied",
          },
        ],
        status: "Active",
        vehicle: "AA-13334-3",
      },
      {
        id: 6,
        deviceName: "Tracker 6",
        brand: "Brand D",
        gpsId: "58575-W",
        rfidKeys: [
          {
            id: 11,
            RfidKey: "2363",
            status: "occupied",
          },
          {
            id: 12,
            RfidKey: "2223",
            status: "occupied",
          },
        ],
        status: "Active",
        vehicle: "AA-44334-4",
      },
      {
        id: 8,
        deviceName: "Tracker 8",
        brand: "Brand A",
        gpsId: "56575-X",
        rfidKeys: [
          {
            id: 13,
            RfidKey: "2323",
            status: "occupied",
          },
          {
            id: 16,
            RfidKey: "5555",
            status: "occupied",
          },
          {
            id: 17,
            RfidKey: "6666",
            status: "occupied",
          },
        ],
        status: "Active",
        vehicle: "AA-44334-4",
      },
    ],
    gpsMountedDate: "",
    tripStartingDate: "",
    Checkpoints: "",
    fromto: "Addis Ababa - Dire Dawa",
    Signal: "",
    Warnings: "",
    Problems: "",
  },
  {
    id: 2,
    tripId: "AD-BD-26622",
    vehicleName: "BMW ",
    brand: "Brand A",
    model: "Model X",
    plateNumber: "AA-4-94577",
    driverId: "BT-7867",
    eSeal: "1,4,6,7",
    gpsMountedDate: "",
    tripStartingDate: "",
    Checkpoints: "",
    fromto: "",
    Signal: "",
    Warnings: "",
    Problems: "",
  },
  {
    id: 3,
    tripId: "OR-TG-24533",
    vehicleName: "Marchedis",
    brand: "Brand A",
    model: "Model X",
    plateNumber: "AA-3-42657",
    driverId: "BT-3757",
    eSeal: "1,4,6,7",
    gpsMountedDate: "",
    tripStartingDate: "",
    Checkpoints: "",
    fromto: "",
    Signal: "",
    Warnings: "",
    Problems: "",
  },
];

export default ActiveVehicle;