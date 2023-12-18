import React from "react";
import { MdOutlineClose } from "react-icons/md";
import styles from "../../Styles/Notification.module.css";
export const AddNotificationModal = ({ OpenModal, HandleModal }) => {
  return (
    <div className={OpenModal ? styles.modalVisible : styles.modal}>
      <div className={styles.ModalMainDiv}>
        <MdOutlineClose
          onClick={HandleModal}
          size={25}
          className={styles.CloseICon}
        />
        <h1 className={styles.Title}>Add Notification</h1>
        <hr />
        <div className={styles.GridSection}>
          <div>
            <label>State</label>
            <select>
              <option value="">State</option>
            </select>
          </div>
          <div>
            <label>District</label>
            <select>
              <option value="">District</option>
            </select>
          </div>
          <div>
            <label>Town</label>
            <select>
              <option value="">Town</option>
            </select>
          </div>
          <div>
            <label>Customer Name</label>
            <select>
              <option value="">Customer Name</option>
            </select>
          </div>
          <div>
            <label>Customer ID</label>
            <select>
              <option value="">Customer ID</option>
            </select>
          </div>
          <div>
            <label>Order ID</label>
            <select>
              <option value="">Order ID</option>
            </select>
          </div>
        </div>
        <div className={styles.TextAreaSection}>
          <label>Notification</label>
          <textarea cols="30" rows="10"></textarea>
        </div>
        <button>Submit</button>
      </div>
    </div>
  );
};
