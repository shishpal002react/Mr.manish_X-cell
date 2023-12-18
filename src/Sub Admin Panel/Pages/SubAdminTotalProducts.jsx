import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { TotalProductMainSection } from "../Components/TotalProducts/TotalProductMainSection";
import styles from "../Styles/DashBoard.module.css";
export const SubAdminTotalProducts = () => {
  return (
    <div className={styles.main}>
      <SiderBar />
      <TotalProductMainSection />
    </div>
  );
};
