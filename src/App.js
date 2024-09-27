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
        <Route path="/VehiclesPage" exact element={<VehiclesPage />}></Route>
      </Routes>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
