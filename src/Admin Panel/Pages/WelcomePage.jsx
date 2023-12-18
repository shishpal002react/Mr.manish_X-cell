import React from "react";
import styles from "./../Styles/WelcomePage.module.css";
import XCELLogo from "../Assets/XCELL_Logo.png";
export const WelcomePage = () => {
  return (
    <div className={styles.WelComeMainDiv}>
      <div className={styles.WelComeMainDivContent}>
        <div>
          <h1>Welcome to</h1>
          <img
            width={"344px"}
            height={"143px"}
            src={XCELLogo}
            alt="XCELL_Logo.png"
          />
        </div>
      </div>
    </div>
  );
};
