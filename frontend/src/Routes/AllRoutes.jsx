import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Tasks from "../pages/Tasks";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="*" element={<h1>404 ERROR</h1>} />
      {/* <PrivateRoute path="/tasks" element={<Tasks />} /> */}
    </Routes>
  );
}

export default AllRoutes;
