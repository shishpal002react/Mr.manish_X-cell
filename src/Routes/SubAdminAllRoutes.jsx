import React from "react";
import { Route, Routes } from "react-router-dom";
import { Invoice } from "../Sub Admin Panel/Pages/Invoice";
import { InvoiceDetails } from "../Sub Admin Panel/Pages/InvoiceDetails";
import { SubAdminBranch } from "../Sub Admin Panel/Pages/SubAdminBranch";
import { SubAdminDashboard } from "../Sub Admin Panel/Pages/SubAdminDashboard";
import { SubAdminHelpAndSupport } from "../Sub Admin Panel/Pages/SubAdminHelpAndSupport";
import { SubAdminHubAndCities } from "../Sub Admin Panel/Pages/SubAdminHubAndCities";
import { SubAdminNotificationPage } from "../Sub Admin Panel/Pages/SubAdminNotificationPage";
import { SubAdminPrivacyPolicy } from "../Sub Admin Panel/Pages/SubAdminPrivacyPolicy";
import { SubAdminProfile } from "../Sub Admin Panel/Pages/SubAdminProfile";
import { SubAdminReport } from "../Sub Admin Panel/Pages/SubAdminReport";
import { SubAdminRoles } from "../Sub Admin Panel/Pages/SubAdminRoles";
import { SubAdminTermAndCondition } from "../Sub Admin Panel/Pages/SubAdminTermAndCondition";
import { SubAdminTotalCustomer } from "../Sub Admin Panel/Pages/SubAdminTotalCustomer";
import { SubAdminTotalProducts } from "../Sub Admin Panel/Pages/SubAdminTotalProducts";
import SubOrderTrack2 from "../Sub Admin Panel/Pages/SubAdminOrderTrack";

export const SubAdminAllRoutes = () => {
  return (
    <Routes>
      <Route path="/subadmindashboard" element={<SubAdminDashboard />} />
      <Route path="/subadminprofile" element={<SubAdminProfile />} />
      <Route
        path="/subadmin-notification"
        element={<SubAdminNotificationPage />}
      />
      <Route path="/subadmin-hubandcities" element={<SubAdminHubAndCities />} />
      <Route path="/subadmin-help" element={<SubAdminHelpAndSupport />} />
      <Route path="/subadmin-privacy" element={<SubAdminPrivacyPolicy />} />
      <Route path="/subadmin-terms" element={<SubAdminTermAndCondition />} />
      <Route path="/subadmin-roles" element={<SubAdminRoles />} />

      <Route path="/subadmin-branch" element={<SubAdminBranch />} />

      <Route path="/subadmin-reports" element={<SubAdminReport />} />

      <Route
        path="/subadmin-totalcustomer"
        element={<SubAdminTotalCustomer />}
      />
      <Route
        path="/subadmin-totalproducts"
        element={<SubAdminTotalProducts />}
      />
      <Route path="/new-invoice" element={<Invoice />} />
      <Route path="/invoice-details" element={<InvoiceDetails />} />
      <Route path="/suborder-track2" element={<SubOrderTrack2 />} />
    </Routes>
  );
};
