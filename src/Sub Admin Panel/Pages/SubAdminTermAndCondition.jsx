import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { TermAndConditionMainSec } from "../Components/TermAndCondition/TermAndConditionMainSec";
import MainStyle from "../Styles/MainSection.module.css";
export const SubAdminTermAndCondition = () => {
  return (
    <div className={MainStyle.main}>
      <SiderBar />
      <TermAndConditionMainSec />
    </div>
  );
};
