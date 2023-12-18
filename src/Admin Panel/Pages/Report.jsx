import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { ReportMainSection } from "../Components/Report/ReportMainSection";
import MainStyle from "../Styles/MainSection.module.css";

export const Report = () => {
  return (
    <div className={MainStyle.main}>
      <SiderBar />
      <ReportMainSection />
    </div>
  );
};
