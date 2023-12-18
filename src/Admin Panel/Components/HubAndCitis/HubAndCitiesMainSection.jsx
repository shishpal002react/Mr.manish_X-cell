/** @format */

import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/HubAndCities.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHubAndCities } from "../../../Redux/Auth/action";
import { Table, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export const HubAndCitiesMainSection = () => {
  const dispatch = useDispatch();
  const citys = useSelector((state) => state.AuthReducer.citys);
  const [modalShow, setModalShow] = React.useState(false);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    dispatch(getHubAndCities());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const ud = localStorage.getItem("token");
    const url = `https://mr-manish-xcell-backend.vercel.app/api/v1/admin/hub-cities/${id}`;
    try {
      const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${ud}` },
      });
      dispatch(getHubAndCities());
    } catch (err) {
      console.log(err.message);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [city, setCity] = useState("");
    const dispatch = useDispatch();

    const url =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/hub-cities";

    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          url,
          { city },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        dispatch(getHubAndCities());
        props.onHide();
      } catch (err) {
        console.log(err.message);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.put(
          `https://mr-manish-xcell-backend.vercel.app/api/v1/admin/hub-cities/${id}`,
          { city },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        dispatch(getHubAndCities());
        props.onHide();
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
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Hub and City" : "Create Hub and Cities"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : handleClick}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="success">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <div className={styles.TitleSection}>
          <h1 className={stylesfromDash.Title}>Hub And Cities</h1>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Add{" "}
          </button>
        </div>

        <div className="myTable">
          <Table>
            <thead>
              <tr>
                <th>City</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {citys?.data?.map((i, index) => (
                <tr key={index}>
                  <td> {i.city} </td>
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
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
