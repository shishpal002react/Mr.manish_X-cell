import React from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { NotificationMainSection } from "../Components/Notification/NotificationMainSection";
import MainStyle from "../Styles/MainSection.module.css";
export const SubAdminNotificationPage = () => {
  return (
    <div className={MainStyle.main}>
      <SiderBar />
      <NotificationMainSection />
    </div>
  );
};
