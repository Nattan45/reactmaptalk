import React from "react";
import { Routes, Route } from "react-router-dom";

// import Maptalk from './Maptalk'
import MaptalksMyLocationPage from "./page/MaptalksMyLocationPage";
import MaptalksPinPage from "./page/MaptalksPinPage";
import MaptalksRoutePage from "./page/MaptalksRoutePage";
import MaptalksCheckpointPage from "./page/MaptalksCheckpointPage";
import MaptalksWarehousePage from "./page/MaptalksWarehousePage";

function App() {
  return (
    <>
      {/* <AuthProvider> */}
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
      </Routes>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
