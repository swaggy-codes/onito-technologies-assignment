import React from "react";
import Home from "../Pages/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";

const MainRouter = () => {
  return (
    <>
      {/* This I basically created to do the routing... */}
      <Routes>
        <Route path='/' exact element={<Navigate replace to='/add-users' />} />
        <Route path='/add-users' element={<Home />} />
      </Routes>
    </>
  );
};

export default MainRouter;
