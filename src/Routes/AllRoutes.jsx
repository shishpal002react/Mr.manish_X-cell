import React, {useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { Branch } from "../Admin Panel/Pages/Branch";
import { DashBoard } from "../Admin Panel/Pages/DashBoard";
import { HelpAndSupport } from "../Admin Panel/Pages/HelpAndSupport";
import { HubAndCities } from "../Admin Panel/Pages/HubAndCities";
import { Login } from "../Admin Panel/Pages/Login";
import { NotificationPage } from "../Admin Panel/Pages/NotificationPage";
import { PrivacyPolicy } from "../Admin Panel/Pages/PrivacyPolicy";
import { Profile } from "../Admin Panel/Pages/Profile";
import { Register } from "../Admin Panel/Pages/Register";
import { Report } from "../Admin Panel/Pages/Report";
import { Roles } from "../Admin Panel/Pages/Roles";
import { TermAndCondition } from "../Admin Panel/Pages/TermAndCondition";
import { TotalCustomer } from "../Admin Panel/Pages/TotalCustomer";
import { TotalOrder } from "../Admin Panel/Pages/TotalOrder";
import { TotalProducts } from "../Admin Panel/Pages/TotalProducts";
import { OrderTrack } from "../Admin Panel/Pages/order-track";
import  OrderTrack2  from "../Admin Panel/Pages/orderTrack";
import { TotalUser } from "../Admin Panel/Pages/users";

export const AllRoutes = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/help" element={<HelpAndSupport />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermAndCondition />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/totalcustomer" element={<TotalCustomer />} />
        <Route path="/totalproducts" element={<TotalProducts />} />
        <Route path="/totalorders" element={<TotalOrder />} />
        <Route path="/hubandcities" element={<HubAndCities />} />
        <Route path="/order-track" element={<OrderTrack />} />
        <Route path="/order-track2" element={<OrderTrack2 />} />
        <Route path="/users" element={<TotalUser />} />
      </Routes>
    </div>
  );
};
