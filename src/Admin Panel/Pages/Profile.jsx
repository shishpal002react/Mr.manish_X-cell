import React, { useState, useEffect } from "react";
import styles from "../Styles/Profile.module.css";
import profile_pic from "../Assets/profile_pic.png";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
export const Profile = () => {
  const [tab, setTab] = useState("overview");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [pid, setPid] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const admin = JSON.parse(localStorage.getItem("userData"));
  //console.log(admin?.adminId);
  const id = admin?.adminId;
  const url = `https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/${id}`;
  const getAllProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log(res?.data?.data);
      setName(res?.data?.data?.firstName + " "+ res?.data?.data?.lastName);
      setRole(res?.data?.data?.email);
      setPid(res?.data?.data?._id);
      setPhone(res?.data?.data?.phone);
      setEmail(res?.data?.data?.email);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getAllProfile();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const image = "https://i.mydramalist.com/R6W7x_5f.jpg";
    //console.log(image, productId, productName, stock, quantity, price);
    // const dispatch = useDispatch();
    const urla =
      `https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/${id}`;
    const handleClick = async (e) => {
      e.preventDefault();
      try {
       // console.log(image, productId, productName, stock, quantity, price);
        const res = await axios.put(
          urla,
          { firstName, lastName, email, phone, password, confirmPassword, role },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        console.log(res?.data);
        // dispatch(getAllProducts());
        getAllProfile();
      } catch (err) {
        console.log(err.message);
      }
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleClick}>
            <label for="email">First Name</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label for="password">Last Name</label>
            <input
              type="text"
              id="password"
              name="password"
              required
              onChange={(e) => setLastName(e.target.value)}
            />

            <label for="phone">Email</label>
            <input
              type="email"
              id="phone"
              name="phone"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="password">Confirm Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label for="password">Role</label>
            <input
              type="text"
              id="password"
              name="password"
              required
              onChange={(e) => setRole(e.target.value)}
            />

            <input type="submit" value="Submit" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.profilePic}>
        <div>
          <div>
            <img
              width={"150px"}
              height={"150px"}
              style={{ borderRadius: "50%" }}
              src={profile_pic}
              alt={profile_pic}
            />
          </div>
          <div>
            <h2>{name}</h2>
            <p className={styles.role}>{role}</p>
          </div>
        </div>
        <button onClick={() => setModalShow(true)}>Update</button>
      </div>
      <p className={styles.AdminId}>{pid}</p>
      <div className={styles.TabTitle}>
        <div
          onClick={() => setTab("overview")}
          className={tab === "overview" && styles.active}
        >
          Overview
        </div>
        <div
          onClick={() => setTab("profilesummary")}
          className={tab === "profilesummary" && styles.active}
        >
          Profile Summary
        </div>
      </div>
      <hr />
      <div className={styles.profileDetail}>
        {tab === "overview" ? (
          <>
            {" "}
            <h2>Summary</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
              corrupti mollitia velit neque eligendi cumque. Ab ipsam
              repellendus fuga quidem iste, illum reiciendis placeat sint. Ipsum
              voluptas in ut quae.
            </p>
            <h2>Language Known</h2>
            <p>Hindi,English</p>
            <h2>Contact Information</h2>
            <p>+91{phone}</p>
            <p>{email}</p>
          </>
        ) : (
          <></>
        )}
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
