/** @format */

import React, { useEffect, useState } from "react";
import styles from "./../Styles/Register.module.css";
import OpenEyeIcon from "./../Assets/OpenEye.svg";
import CloseEyeIcon from "./../Assets/CloseEye.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetBranches, GetRoles, Signup } from "../../Redux/Auth/action";
const IntialState = {
  branch: "",
  confirmPassword: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
  role: "",
};
export const Register = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(IntialState);
  const [showCon, setShowCon] = useState(false);
  const [isCheck, setIscheck] = useState(false);
  const roles = useSelector((state) => state.AuthReducer.roles);
  const branches = useSelector((state) => state.AuthReducer.branches);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleChange = (e) => {
    let { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  const HandleRegister = () => {
    if (
      data.branch === "" ||
      data.confirmPassword === "" ||
      data.password === "" ||
      data.firstName === "" ||
      data.lastName === "" ||
      data.email === "" ||
      data.phone === "" ||
      data.role === ""
    ) {
      alert("All details required!");
    } else if (isCheck === false) {
      alert("Accept term and conditions!");
    } else {
      dispatch(Signup(data)).then((res) => {
        if (res.payload === "signed up successfully") {
          alert(res.payload);
          navigate("/");
        } else {
          alert(res.payload);
        }
      });
    }
  };
  useEffect(() => {
    dispatch(GetRoles());
    dispatch(GetBranches());
  }, [dispatch]);
  return (
    <div className={styles.main}>
      <h1 className={styles.Title}>Register</h1>
      <div className={styles.inputParent}>
        <div className={styles.inputBox}>
          <input
            type="text"
            name="firstName"
            onChange={HandleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            name="lastName"
            onChange={HandleChange}
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div className={styles.inputParent}>
        <div className={styles.inputBox}>
          <input
            type="tel"
            name="phone"
            onChange={HandleChange}
            required
            placeholder="Phone Number"
          />
        </div>
        <div className={styles.inputBox}>
          <input
            type="email"
            name="email"
            onChange={HandleChange}
            placeholder="Email"
          />
        </div>
      </div>
      <div className={styles.inputParent}>
        <div className={styles.inputBox}>
          <input
            type={show ? "text" : "password"}
            name="password"
            onChange={HandleChange}
            required
            placeholder="Password"
          />
          {show ? (
            <img
              src={OpenEyeIcon}
              onClick={() => setShow(false)}
              alt={OpenEyeIcon}
              className={styles.passeye}
            />
          ) : (
            <img
              onClick={() => setShow(true)}
              src={CloseEyeIcon}
              alt={CloseEyeIcon}
              className={styles.passeye}
            />
          )}
        </div>
        <div className={styles.inputBox}>
          <input
            type={showCon ? "text" : "password"}
            name="confirmPassword"
            onChange={HandleChange}
            placeholder="Confirm Password"
            required
          />
          {showCon ? (
            <img
              src={OpenEyeIcon}
              onClick={() => setShowCon(false)}
              alt={OpenEyeIcon}
              className={styles.passeye}
            />
          ) : (
            <img
              onClick={() => setShowCon(true)}
              src={CloseEyeIcon}
              alt={CloseEyeIcon}
              className={styles.passeye}
            />
          )}
        </div>
      </div>
      <div className={styles.inputParent}>
        <div className={styles.inputBox}>
          <select name="branch" onChange={HandleChange} required>
            <option value="">Select Branch</option>
            {branches?.map((ele) => (
              <>
                <option key={ele.id} value={ele.branch}>
                  {ele.branch}
                </option>
              </>
            ))}
          </select>
        </div>
        <div className={styles.inputBox} required>
          <select name="role" onChange={HandleChange}>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Sub-Admin">Sub Admin</option>
          </select>
        </div>
      </div>
      <div className={styles.lastDiv}>
        <input type="checkbox" onChange={() => setIscheck(true)} required />
        <p>
          I agree to all the <Link to={"/"}>Terms & Privacy Policy</Link>
        </p>
      </div>
      <button onClick={HandleRegister}>Register</button>
      <div className={styles.loginText}>
        <p>
          Already have an account? <Link to={"/"}>Log in</Link>
        </p>
      </div>
    </div>
  );
};
