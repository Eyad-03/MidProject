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
import ReviewPage from "./pages/ReviewPage";
import Review from "./components/Admin/Review";
import ServiceDetails from "./pages/ServiceDetails";
import UpdateServiceProvider from "./components/Provider/UpdateServiceProvider";
import RequestService from "./components/Provider/RequestService";

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
          <Route path="/review" element={<ReviewPage/>} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="/serviceDetail" element={<ServiceDetails />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />}>
            <Route path="" element={<MainAdmin />} />
            <Route path="setting" element={<MainAdmin />} />
            <Route path="review" element={<Review />} />
            <Route path="updateUser" element={<UpdateUser />} />
            <Route path="updateCategory" element={<UpdateCategory />} />
            <Route path="updateService" element={<UpdateService />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/dashboardProvider" element={<DashboardProvider />}>
            <Route path="" element={<MainProvider />} />
            <Route path="setting" element={<MainProvider />} />
            <Route path="UpdateServiceProvider" element={<UpdateServiceProvider />} />
            <Route path="request" element={<RequestService />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
