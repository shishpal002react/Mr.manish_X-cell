import React from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import { CreateNewInvoice } from "./CreateNewInvoice";
export const InvoiceMainSection = () => {
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <CreateNewInvoice />
    </div>
  );
};
