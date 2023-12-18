import React from "react";
import { MdOutlineClose } from "react-icons/md";
import styles from "../../Styles/OrderStatusModal.module.css";
export const OrderUpdateStatusModal = ({ OpenModal, HandleModal }) => {
  return (
    <div className={OpenModal ? styles.modalVisible : styles.modal}>
      <div className={styles.OrderUpdateModalMainDiv}>
        <MdOutlineClose
          onClick={HandleModal}
          size={25}
          className={styles.UpdateModalCloseICon}
        />
        <p>Manual Tracking status shown to customer</p>
        <div>
          <p>Enter Current Status Of Order</p>
          <button>Add</button>
        </div>
        <input type="text" />
        <button className={styles.submitBtn}>Submit</button>
      </div>
    </div>
  );
};
