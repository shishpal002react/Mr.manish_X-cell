import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { TotalOrderMainSection } from "../Components/TotalOrder/TotalOrderMainSection";

import styles from "../Styles/DashBoard.module.css";
export const TotalOrder = () => {
  return (
    <div className={styles.main}>
      <SiderBar />
      <TotalOrderMainSection />
    </div>
  );
};
