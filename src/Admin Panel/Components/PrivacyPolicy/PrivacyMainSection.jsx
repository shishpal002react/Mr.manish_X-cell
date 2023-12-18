/** @format */

import React, { useState, useEffect } from "react";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import styles from "../../Styles/PrivacyPolicy.module.css";
import axios from "axios";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

export const PrivacyMainSection = () => {
  const [privacyPol, setPrivacyPol] = useState("");
  const [privacyId, setPrivacyId] = useState("");

  const url = "https://mr-manish-xcell-backend.vercel.app/api/v1/privacy";
  const ud = localStorage.getItem("token");

  const getPrivacy = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrivacyPol(res?.data?.data?.content);
      setPrivacyId(res?.data?.data?._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getPrivacy();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [content, setContent] = useState("");
    const urla = "https://mr-manish-xcell-backend.vercel.app/api/v1/privacy";
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          urla,
          { content },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        getPrivacy();
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
              <Form.Label>Privacy Policy</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  const deleteHandler = async (id) => {
    try {
      const { res } = await axios.delete(
        `https://mr-manish-xcell-backend.vercel.app/api/v1/privacy/${id}`,
        {
          headers: {
            Authorization: `Bearer ${ud}`,
          },
        }
      );
      getPrivacy();
    } catch {}
  };

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Privacy Policy</h1>
        <button onClick={() => setModalShow(true)}>Add</button>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />

      <div className="myTable">
        <Table>
          <thead>
            <tr>
              <th>Privacy Policy</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {privacyPol} </td>
              <td>
                <AiFillDelete
                  style={{ color: "#c5161d" }}
                  onClick={() => deleteHandler(privacyId)}
                />
              </td>
            </tr>
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
