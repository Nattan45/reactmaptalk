import React from "react";
import { Routes, Route } from "react-router-dom";

// import Maptalk from './Maptalk'
import ScrollToTop from "./components/ScrollToTop";
import MaptalksMyLocationPage from "./page/MaptalksMyLocationPage";
import MaptalksPinPage from "./page/MaptalksPinPage";
import MaptalksRoutePage from "./page/MaptalksRoutePage";
import MaptalksCheckpointPage from "./page/MaptalksCheckpointPage";
import MaptalksWarehousePage from "./page/MaptalksWarehousePage";
import SavedLocationsPage from "./page/SavedLocationsPage";
import DevicesPage from "./page/DevicesPage";
import VehiclesPage from "./page/VehiclesPage";
import TrackerPage from "./page/TrackerPage";
import AccountPage from "./page/AccountPage";
import NotFoundPage from "./page/NotFoundPage";
import TripPage from "./page/TripPage";
import ProblemDetails from "./page/ProblemDetails";
import CheckpointsListPage from "./page/CheckpointsListPage";
import WarehouseListPage from "./page/WarehouseListPage";
import RouteListPage from "./page/RouteListPage";
import PinListPage from "./page/PinListPage";
import DevicesStatusPage from "./page/DevicesStatusPage";

function App() {
  return (
    <>
      {/* <AuthProvider> */}
      <ScrollToTop />

      <Routes>
        <Route path="/" exact element={<MaptalksMyLocationPage />}></Route>
        <Route
          path="/MaptalksMyLocationPage"
          exact
          element={<MaptalksMyLocationPage />}
        ></Route>
        <Route
          path="/MaptalksPinPage"
          exact
          element={<MaptalksPinPage />}
        ></Route>
        <Route
          path="/MaptalksRoutePage"
          exact
          element={<MaptalksRoutePage />}
        ></Route>
        <Route
          path="/MaptalksCheckpointPage"
          exact
          element={<MaptalksCheckpointPage />}
        ></Route>
        <Route
          path="/MaptalksWarehousePage"
          exact
          element={<MaptalksWarehousePage />}
        ></Route>
        <Route
          path="/SavedLocationsPage"
          exact
          element={<SavedLocationsPage />}
        ></Route>
        <Route path="/DevicesPage" exact element={<DevicesPage />}></Route>
        <Route
          path="/DevicesStatusPage"
          exact
          element={<DevicesStatusPage />}
        ></Route>
        <Route path="/VehiclesPage" exact element={<VehiclesPage />}></Route>
        <Route path="/TrackerPage" exact element={<TrackerPage />}></Route>
        <Route path="/AccountPage" exact element={<AccountPage />}></Route>
        <Route path="/TripPage" exact element={<TripPage />}></Route>
        <Route
          path="/CheckpointsListPage"
          exact
          element={<CheckpointsListPage />}
        ></Route>
        <Route
          path="/WarehouseListPage"
          exact
          element={<WarehouseListPage />}
        ></Route>
        <Route path="/RouteListPage" exact element={<RouteListPage />}></Route>
        <Route path="/PinListPage" exact element={<PinListPage />}></Route>
        {/* redirects */}
        <Route path="/problem/:id" element={<ProblemDetails />} />
        {/* Catch-all route for 404 page */}
        <Route path="/404" element={<NotFoundPage />} />{" "}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* </AuthProvider> */}
    </>
  );
}

export default App;
