import React from "react";
import {
  MdOutlineAccountCircle,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/DashBoard.module.css";



export const MainInfo = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.mainInfo}>
      <div>
        <MdOutlineAccountCircle
          className={styles.mainIcon}
          onClick={() => navigate("/profile")}
        />
        {/*<MdOutlineNotificationAdd className={styles.mainIcon} 
        />
  <AiOutlineSetting className={styles.mainIcon} />*/}
      </div>
    </div>
  );
};
