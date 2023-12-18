/** @format */

import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Help.module.css";
import axios from "axios";
import { Modal, Form, Button, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export const HelpMainSection = () => {
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [not,setNot]=useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const url =
    "https://mr-manish-xcell-backend.vercel.app/api/v1/support-tickets";
  const getHelp = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmail(res?.data?.data?.email);
      setPhone(res?.data?.data?.phone);
      // setHid(res?.data?.data?._id);
      setNot(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getHelp();
  }, []);

  const handleDelete = async (id) => {
    const urld = `https://mr-manish-xcell-backend.vercel.app/api/v1/support-tickets/${id}`;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(urld, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getHelp();
    } catch (err) {
      console.log(err.message);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const urlx =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/support-tickets";
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          urlx,
          { email, phone },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        getHelp();
      } catch (err) {
        console.log(err.message);
      }
    };
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleClick}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email "
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                minLength={8}
                maxLength={12}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success" >Submit</Button>
          </Form>
         
        </Modal.Body>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Help And Support</h1>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.HelpGridSection}>
        {
          <>
            <p>{email}</p>
            <p>{phone}</p>
            <button onClick={() => setModalShow(true)}>Create</button>
          </>
        }
      </div>
      <div className="myTable">
        <Table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Create date</th>
              <th>Update date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {not?.map((i, index) => (
              <tr key={index}>
                <td> {i.email} </td>
                <td> {i.phone} </td>
               
                <td>{new Date(i.updatedAt).toLocaleDateString()}</td>
                <td>{new Date(i.updatedAt).toLocaleDateString()}</td>
                <td>{i.location}</td>
                <td>
                  <span className="flex-cont">
                    <AiFillDelete
                      onClick={() => handleDelete(i._id)}
                      style={{ color: "#c5161d" }}
                    />
                    <AiFillEdit
                      onClick={() => {
                        setId(i._id);
                        setEdit(true);
                        setModalShow(true);
                      }}
                      style={{ color: "#4287f5" }}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
