/** @format */

import React, { useEffect, useState } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/PrivacyPolicy.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTerms } from "../../../Redux/Auth/action";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

export const TermAndConditionMainSec = () => {
  const terms = useSelector((state) => state.AuthReducer.terms);
  const dispatch = useDispatch();
  const ud = localStorage.getItem("token");
  useEffect(() => {
    dispatch(getTerms());
  }, [dispatch]);

  const handleClick = async (id) => {
    try {
      const res = await axios.delete(
        `https://mr-manish-xcell-backend.vercel.app/api/v1/admin/terms/${id}`,
        {
          headers: {
            Authorization: `Bearer ${ud}`,
          },
        }
      );
      dispatch(getTerms());
    } catch {}
  };

  function MyVerticallyCenteredModal(props) {
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const url = "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/terms";
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          url,
          { content },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        dispatch(getTerms());
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
              <Form.Label>Terms and Condition</Form.Label>
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

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Terms and Condition</h1>
        <button onClick={() => setModalShow(true)}>Add</button>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />

      <div className="myTable">
        <Table>
          <thead>
            <tr>
              <th>Terms and Condition</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {terms?.content} </td>
              <td>
                <AiFillDelete
                  style={{ color: "#c5161d" }}
                  onClick={() => handleClick(terms?._id)}
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
