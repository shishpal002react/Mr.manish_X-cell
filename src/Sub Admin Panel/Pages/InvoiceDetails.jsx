import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { InvoiceDetailsMainSection } from "../Components/Invoice/InvoiceDetailsMainSection";

import styles from "../Styles/DashBoard.module.css";
export const InvoiceDetails = () => {
  return (
    <div className={styles.main}>
      <SiderBar />
      <InvoiceDetailsMainSection />
    </div>
  );
};
