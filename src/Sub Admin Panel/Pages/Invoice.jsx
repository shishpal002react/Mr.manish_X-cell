import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { InvoiceMainSection } from "../Components/Invoice/InvoiceMainSection";
import styles from "../Styles/DashBoard.module.css";
export const Invoice = () => {
  return (
    <div className={styles.main}>
      <SiderBar />
      <InvoiceMainSection />
    </div>
  );
};
