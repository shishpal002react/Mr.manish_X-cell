/** @format */

import React, { useEffect, useState } from "react";
import styles from "./../Styles/Login.module.css";
import MsgBoxIcon from "./../Assets/MsgBoxIcon.svg";
import OpenEyeIcon from "./../Assets/OpenEye.svg";
import CloseEyeIcon from "./../Assets/CloseEye.svg";
import { Link, useNavigate } from "react-router-dom";
import { WelcomePage } from "./WelcomePage";
import { useDispatch, useSelector } from "react-redux";
import { GetRoles, SignIn } from "../../Redux/Auth/action";
const IntialState = {
  password: "",
  email: "",
  role: "",
};
export const Login = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(IntialState);
  const [isLodding, setisLodding] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleLogin = () => {
    if (data.email === "" || data.password === "" || data.role === "") {
      alert("All details are required!");
    } else {
      dispatch(SignIn(data)).then((res) => {
        if (res.type === "SIGNIN_FAILURE_REQUEST") {
          alert(res.payload);
        } else {
          if (data.role === "Admin") {
            navigate("/dashboard");
          } else {
            navigate("/subadmindashboard");
          }
        }
      });
    }
  };

  const HandleOnchange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    dispatch(GetRoles());
    let temp = setTimeout(() => {
      setisLodding(false);
    }, 3000);
    if (!isLodding) {
      clearTimeout(temp);
    }
  }, [isLodding, dispatch]);
  if (isLodding) {
    return <WelcomePage />;
  }
  return (
    <div className={styles.main}>
      <h1 className={styles.Title}>Log In</h1>
      <div className={styles.inputBox}>
        <input
          type="text"
          name="email"
          onChange={HandleOnchange}
          placeholder="Email/ID"
        />
        <img src={MsgBoxIcon} alt={MsgBoxIcon} />
      </div>
      <div className={styles.inputBox}>
        <input
          type={show ? "text" : "password"}
          name="password"
          onChange={HandleOnchange}
          placeholder="Password"
        />
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
        <select name="role" onChange={HandleOnchange}>
          <option>Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Sub-Admin">Sub Admin</option>
        </select>
      </div>
      <button onClick={HandleLogin}>Log In</button>
      <div className={styles.lastDiv}>
        <div>
          <p>Didn't have account</p>
          <Link to={"/register"}>
            <h2 className={styles.createAcc}>Create Account</h2>
          </Link>
        </div>
        <h2>Forget Password</h2>
      </div>
    </div>
  );
};
