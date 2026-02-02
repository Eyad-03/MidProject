import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import SigninPage from "./pages/SigninPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ServicePage from "./pages/ServicePage";
import DashboardProvider from "./components/Provider/DashboardProvider";
import DashboardAdmin from "./components/Admin/DashboardAdmin";
import MainProvider from "./components/Provider/MainProvider";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import UpdateUser from "./components/Admin/UpdateUser";
import MainAdmin from './components/Admin/MainAdmin';
import UpdateCategory from "./components/Admin/UpdateCategory";
import UpdateService from "./components/Admin/UpdateService";
import ProfileUser from "./pages/ProfileUser";
function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profileuser" element={<ProfileUser/>} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />}>
            <Route path="" element={<MainAdmin />} />
            <Route path="setting" element={<MainAdmin />} />
            <Route path="updateUser" element={<UpdateUser />} />
            <Route path="updateCategory" element={<UpdateCategory />} />
            <Route path="updateService" element={<UpdateService />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/dashboardProvider" element={<DashboardProvider />}>
            <Route path="" element={<MainProvider />} />
            <Route path="setting" element={<MainProvider />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
