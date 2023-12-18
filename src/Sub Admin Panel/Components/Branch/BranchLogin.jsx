import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/Login.module.css";
import OpenEyeIcon from "../../Assets/OpenEye.svg";
import CloseEyeIcon from "../../Assets/CloseEye.svg";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";

export const BranchLogin = ({ OpenModal, HandleBranchLoginModal }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const HandleLogin = () => {
    navigate("/");
  };
  return (
    <div className={OpenModal ? styles.modalVisible : styles.modal}>
      <div className={styles.Branchmain}>
        <MdOutlineClose
          onClick={HandleBranchLoginModal}
          size={25}
          className={styles.CloseICon}
        />
        <h1 className={styles.Title}>Log In</h1>
        <div className={styles.inputBox}>
          <input type="text" placeholder="ID" />
          <HiOutlineIdentification size={25} />
        </div>
        <div className={styles.inputBox}>
          <input type={show ? "text" : "password"} placeholder="Password" />
          {show ? (
            <img
              src={OpenEyeIcon}
              onClick={() => setShow(false)}
              alt={OpenEyeIcon}
            />
          ) : (
            <img
              onClick={() => setShow(true)}
              src={CloseEyeIcon}
              alt={CloseEyeIcon}
            />
          )}
        </div>
        <div className={styles.inputBox}>
          <select>
            <option value="">Select Branch</option>
            <option value="">Branch</option>
          </select>
        </div>
        <button onClick={HandleLogin}>Log In</button>
        <div className={styles.BranchlastDiv}>
          <h2>Forget Password</h2>
        </div>
      </div>
    </div>
  );
};
