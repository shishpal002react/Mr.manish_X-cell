import React from "react";
import { MdOutlineClose } from "react-icons/md";
import styles from "../../Styles/AddCustomerModal.module.css";
export const AddCustomerModal = ({ openModal, HandleModal }) => {
  return (
    <div className={openModal ? styles.modalVisible : styles.modal}>
      <div className={styles.ModalMainDiv}>
        <div className={styles.ModalTitleDiv}>
          <h2>Add Customer</h2>
          <MdOutlineClose
            onClick={HandleModal}
            size={35}
            className={styles.CloseICon}
          />
        </div>
        <hr />
        <div className={styles.InputDiv}>
          <label>Customer Name:*</label>
          <input className={styles.inputLarge} type="text" required />
          <div>
            <div>
              <label>Mobile Number:*</label>
              <input type="number" required />
            </div>

            <div>
              <label>Mobile Number:*</label>
              <input type="number" required />
            </div>
          </div>
          <label>Select Therapy:*</label>
          <select>
            <option value=""></option>
          </select>
          <label>Address:*</label>
          <textarea className={styles.AddresstextArea} type="text" required />
          <div>
            <div>
              <label>State:*</label>
              <select required>
                <option value=""></option>
              </select>
            </div>

            <div>
              <label>District:*</label>
              <select required>
                <option value=""></option>
              </select>
            </div>
            <div>
              <label>Town/Village:*</label>
              <select required>
                <option value=""></option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label style={{display:"block"}}>Map Branch:*</label>
              <select required>
                <option value=""></option>
              </select>
            </div>
          </div>
        </div>
        <button>Add Customer</button>
      </div>
    </div>
  );
};
