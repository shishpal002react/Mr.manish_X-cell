import React from "react";
import styles from "../../Styles/OrderStatusModal.module.css";
import { GrNotes } from "react-icons/gr";
import { MdPayment } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
export const StatusTrack = (props) => {
  return (
    <div className={styles.StatusTrackMainDiv}>
      <div>
        <div className={styles.StatusDateBig}>
          <h1>{props.date}</h1>
          <p>{props.time}</p>
        </div>
        {/*<div className={styles.StatusDateSmall}>
          <h1>Jan 20</h1>
          <p>11:20AM</p>
        </div>
        <div className={styles.StatusDateSmall}>
          <h1>Jan 20</h1>
          <p>11:20AM</p>
        </div>
        <div className={styles.StatusDateBig}>
          <h1>Jan 20</h1>
          <p>11:20AM</p>
        </div>
        <div className={styles.StatusDateBig}>
          <h1>Jan 20</h1>
          <p>11:20AM</p>
        </div>
        <div className={styles.StatusDateBig}>
          <h1>Jan 20</h1>
          <p>11:20AM</p>
        </div>
        <div className={styles.StatusDateSmall}>
          <h1>Jan 20</h1>
          <p>11:20AM</p>
        </div>
        <div className={styles.StatusDateSmall}>
          <h1>Jan 20</h1>
          <p>11:20AM</p>
        </div>
        <div className={styles.StatusDateBig}>
          <h1>Jan 20</h1>
          <p>11:20AM</p>
        </div>*/}
      </div>
      <div>
        <div className={styles.StatusTrackSecondDiv}>
          <div className={styles.StatusTrackSecondDivIcons}>
            <GrNotes size={25} />
          </div>
          <p>{props.track}</p>
        </div>
        {/*<div className={styles.StatusTrackSecondDivSmall}>
          <div className={styles.StatusTrackSecondDivSmallIcons}></div>
          <p>Order Recived by admin</p>
        </div>
        <div className={styles.StatusTrackSecondDivSmall}>
          <div className={styles.StatusTrackSecondDivSmallIcons}></div>
          <p>Order Recived by admin</p>
        </div>
        <div className={styles.StatusTrackSecondDiv}>
          <div className={styles.StatusTrackSecondDivIcons}>
            <GrNotes size={25} />
          </div>
          <p>Order Recived by admin</p>
        </div>
        <div className={styles.StatusTrackSecondDivRed}>
          <div className={styles.StatusTrackSecondDivRedIcons}>
            <MdPayment size={25} />
          </div>
          <p>Payment Recieved</p>
        </div>
        <div className={styles.StatusTrackSecondDivRed}>
          <div className={styles.StatusTrackSecondDivRedIcons}>
            <RiTruckLine size={25} />
          </div>
          <p>Order Recived by admin</p>
        </div>
        <div className={styles.StatusTrackSecondDivRedSmall}>
          <div className={styles.StatusTrackSecondDivRedSmallIcons}></div>
          <p>Order Recived by admin</p>
        </div>
        <div className={styles.StatusTrackSecondDivRedSmall}>
          <div className={styles.StatusTrackSecondDivRedSmallIcons}></div>
          <p>Order Recived by admin</p>
        </div>
        <div className={styles.StatusTrackSecondDivRedLast}>
          <div className={styles.StatusTrackSecondDivRedIcons}>
            <IoCheckmarkCircleSharp size={25} />
          </div>
          <p>Order Recived by admin</p>
      </div>*/}
      </div>
    </div>
  );
};
