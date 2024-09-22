# MapTalk Vehicle Tracking System

## Overview

**Vehicle Tracking System** is a React-based application that allows users to track vehicles in real-time, manage pin locations, and create custom routes, checkpoints, and warehouses using an interactive map interface powered by [Maptalks](https://maptalks.org/). MongoDB is used in the frontend to store and manage map data, providing persistence for vehicle tracking and route creation. The backend is developed using Spring Boot to handle the core functionalities of vehicle management.

## Features

- **Real-Time Vehicle Tracking**: Track vehicles' live location on the map.
- **CRUD Operations on Pin Locations**: Create, read, update, and delete pin locations dynamically on the map.
- **Custom Route Creation**: Define routes with waypoints and checkpoints.
- **Warehouse Management**: Create polygon-shaped warehouses with area calculations directly on the map.
- **Interactive Checkpoints**: Add checkpoints for better logistics and monitoring.
- **Data Persistence with MongoDB (Frontend)**: MongoDB is used to store map data, ensuring that location and route information persists across sessions.
- **Responsive Design**: The interface adapts to various devices, providing a seamless experience on mobile and desktop.

## Backend

The backend, built using Spring Boot, provides APIs for managing vehicle data, route information, and pin location updates. While MongoDB is utilized on the frontend for storing map-related data, the backend handles the core logic and provides data validation and business rules.

## Installation

To get started with the project, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Nattan45/reactmaptalk.git
   cd reactmaptalk
   ```

2. **Install Frontend Dependencies**:
   Navigate to the project directory:

   ```bash
   cd reactmaptalk
   npm install
   ```

3. **Start the Frontend Development Server**:

   ```bash
   npm start
   ```

4. **Setup the Backend**:
   - Please use the README.md file provided in the following Github link.
   - [Github](https://maptalks.org/) for more Info.

## Usage

1. **Real-Time Vehicle Tracking**:

   - View and track the current location of vehicles.
   - Click on vehicles to see real-time data.

2. **Show Your Locations**:

   - Easily View Your locations for better management.

3. **Manage Pin Locations**:

   - Add, edit, or delete pin locations on the map.
   - Easily adjust pin locations for better management.

4. **Route Creation**:

   - Create and adjust custom routes using waypoints and checkpoints.
   - Export route data for logistics or vehicle management use cases.

5. **Checkpoints Creation**:

   - Draw Rectangles to represent checkpoints, calculating and displaying the area of each.

6. **Warehouse Creation**:

   - Draw polygons to represent warehouses, calculating and displaying the area of each along with coordinates.

7. **View Saved Documents**:
   - You can view the saved Pinned places, Routes, Checkpoints, and Warehouses and track the live activities.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes.
4. Commit your changes: `git commit -m 'Add some feature'`.
5. Push to the branch: `git push origin feature-branch-name`.
6. Open a pull request.

## Acknowledgements

- [Maptalks](https://maptalks.org/) for their robust mapping library.
- [React](https://reactjs.org/) for front-end development.
- [Spring Boot](https://spring.io/projects/spring-boot) for backend development.
- [MongoDB](https://www.mongodb.com/) for data management on the frontend.

## Contact

For any questions or suggestions, feel free to reach out via [LinkedIn](https://www.linkedin.com).
