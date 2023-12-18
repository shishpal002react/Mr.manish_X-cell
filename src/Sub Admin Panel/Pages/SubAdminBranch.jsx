import React from "react";
import { TotalBranch } from "../Components/Branch/TotalBranch";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import styles from "../Styles/DashBoard.module.css";
export const SubAdminBranch = () => {
  return (
    <div className={styles.main}>
      <SiderBar />
      <TotalBranch />
    </div>
  );
};
