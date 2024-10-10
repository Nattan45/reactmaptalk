const Problem = [
  {
    id: 1,
    tripId: "AA-DR-24522",
    plateNumber: "AA-4-13234",
    driver: [
      {
        id: 1,
        driverName: "JohnDoe",
        driverId: "BT-1397",
        phoneNumber: "+251916975646",
      },
    ],
    eSeal: [
      {
        id: 1,
        deviceName: "Tracker 1",
        brand: "Brand A",
        gpsId: "78675-X",
        battery: "70",
        status: "Active",
      },
      {
        id: 4,
        deviceName: "Tracker 4",
        brand: "Brand A",
        gpsId: "58675-X",
        battery: "79",
        status: "Inactive",
      },
      {
        id: 6,
        deviceName: "Tracker 6",
        brand: "Brand D",
        gpsId: "58575-W",
        battery: "69",
        status: "Active",
      },
      {
        id: 8,
        deviceName: "Tracker 8",
        brand: "Brand A",
        gpsId: "56575-X",
        battery: "90",
        status: "Inactive",
      },
    ],
    gpsMountedDate: "12-09-2024",
    tripStartingDate: "13-09-2024",
    fromto: "Addis Ababa - Dire Dawa",
    Details: "Broken Eseal",
  },
  {
    id: 2,
    tripId: "AA-BA-12457",
    plateNumber: "BA-7-32456",
    gpsMountedDate: "05-08-2024",
    tripStartingDate: "06-08-2024",
    fromto: "Bahir Dar - Addis Ababa",
    Details: "Intermittent GPS signal",
  },
  {
    id: 3,
    tripId: "AA-MK-99341",
    plateNumber: "MK-1-87234",
    gpsMountedDate: "20-07-2024",
    tripStartingDate: "21-07-2024",
    fromto: "Mekelle - Dessie",
    Details: "Battery issue with GPS",
  },
  {
    id: 4,
    tripId: "AA-JJ-78564",
    plateNumber: "JJ-5-99856",
    gpsMountedDate: "15-09-2024",
    tripStartingDate: "16-09-2024",
    fromto: "Jimma - Gambella",
    Details: "No GPS signal detected",
  },
  {
    id: 5,
    tripId: "AA-HR-45789",
    plateNumber: "HR-6-54321",
    gpsMountedDate: "01-10-2024",
    tripStartingDate: "02-10-2024",
    fromto: "Harar - Jijiga",
    Details: "Faulty wiring causing GPS failure",
  },
  {
    id: 6,
    tripId: "AA-SH-23987",
    plateNumber: "SH-8-56789",
    gpsMountedDate: "25-09-2024",
    tripStartingDate: "26-09-2024",
    fromto: "Shashemene - Awassa",
    Details: "GPS device overheating",
  },
];
export default Problem;