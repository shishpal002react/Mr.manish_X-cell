import React from "react";
import { MainSection } from "../Components/Dashboard/MainSection";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import styles from "../Styles/DashBoard.module.css";
export const SubAdminDashboard = () => {
  return (
    <div className={styles.main}>
      <SiderBar />
      <MainSection />
    </div>
  );
};
