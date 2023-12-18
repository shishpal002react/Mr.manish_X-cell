import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { TotalUserMainSection } from "../Components/TotalUser/totalUser";
import styles from "../Styles/DashBoard.module.css";
export const TotalUser = () => {
  return (
    <div className={styles.main}>
      <SiderBar />
      <TotalUserMainSection />
    </div>
  );
};
