import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import SigninPage from "./pages/SigninPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ServicePage from "./pages/ServicePage";
import DashboardProvider from "./pages/DashboardProvider";
import DashboardAdmin from "./pages/DashboardAdmin";
import MainProvider from "./pages/MainProvider";
import ProfileProvider from "./pages/ProfileProvider";
import { Toaster } from "react-hot-toast";
import UpdateUser from "./components/UpdateUser";
import MainAdmin from "./pages/MainAdmin";
function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />}>
          <Route path="" element={<MainAdmin />} />
            <Route path="updateUser" element={<UpdateUser />} />
          </Route>
          <Route path="/dashboardProvider" element={<DashboardProvider />}>
            <Route path="" element={<MainProvider />} />
            <Route path="profile" element={<ProfileProvider />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
