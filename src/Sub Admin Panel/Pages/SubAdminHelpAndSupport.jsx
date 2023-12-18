import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { HelpMainSection } from "../Components/HelpAndSupport/HelpMainSection";
import MainStyle from "../Styles/MainSection.module.css";
export const SubAdminHelpAndSupport = () => {
  return (
    <div className={MainStyle.main}>
      <SiderBar />
      <HelpMainSection />
    </div>
  );
};
