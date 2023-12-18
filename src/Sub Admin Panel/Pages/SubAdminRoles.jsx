import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { RoleMainSection } from "../Components/Roles/RoleMainSection";
import MainStyle from "../Styles/MainSection.module.css";
export const SubAdminRoles = () => {
  return (
    <div className={MainStyle.main}>
      <SiderBar />
      <RoleMainSection />
    </div>
  );
};
