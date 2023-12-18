import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { HubAndCitiesMainSection } from "../Components/HubAndCitis/HubAndCitiesMainSection";

import styles from "../Styles/DashBoard.module.css";
export const HubAndCities = () => {
  return (
    <div className={styles.main}>
      <SiderBar />
      <HubAndCitiesMainSection />
    </div>
  );
};
