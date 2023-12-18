import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { PrivacyMainSection } from "../Components/PrivacyPolicy/PrivacyMainSection";
import MainStyle from "../Styles/MainSection.module.css";
export const SubAdminPrivacyPolicy= () => {
  return (
    <div className={MainStyle.main}>
      <SiderBar />
      <PrivacyMainSection />
    </div>
  );
};
