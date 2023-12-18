import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { TotalCustomerMainSection } from "../Components/TotalCustomer/TotalCustomerMainSection";
import styles from "../Styles/DashBoard.module.css";
export const SubAdminTotalCustomer = () => {
  return (
    <div className={styles.main}>
      <SiderBar />
      <TotalCustomerMainSection />
    </div>
  );
};
