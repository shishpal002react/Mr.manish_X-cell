/** @format */

import React, { useState, useEffect } from "react";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import styles from "../../Styles/Notification.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { AddNotificationModal } from "./AddNotificationModal";
import axios from "axios";
import { Modal, Button, Form, Table } from "react-bootstrap";

export const NotificationMainSection = () => {
  const [OpenModal, setOpenModal] = useState(false);
  const [not, setNot] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const url =
    "https://mr-manish-xcell-backend.vercel.app/api/v1/notifications/";

  const getNotifications = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNot(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");

    const urla =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/notifications/";

    const fetchHandler = async () => {
      try {
        const res = await axios.get(
          `https://mr-manish-xcell-backend.vercel.app/api/v1/users`
        );
        setUsers(res.data.data.data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        fetchHandler();
      }
    }, [props]);

    const payload = {
      title,
      message,
      recipients: [
        {
          userId,
        },
      ],
    };

    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(urla, payload, {
          headers: {
            Authorization: `Bearer ${ud}`,
          },
        });
        getNotifications();
        props.onHide();
      } catch (err) {
        console.log(err.message);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.patch(
          `https://mr-manish-xcell-backend.vercel.app/api/v1/notifications/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        getNotifications();
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
            {edit ? "Edit Notification" : "Create New "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : handleClick}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Form.Select
              className="mb-3"
              onChange={(e) => setUserId(e.target.value)}
            >
              <option>Select User</option>
              {users?.map((i, index) => (
                <option value={i._id} key={index}>
                  {" "}
                  {i.firstName + " " + i.middleName + " " + i.lastName}{" "}
                </option>
              ))}
            </Form.Select>
            <Button type="submit" variant="success">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  const handleDelete = async (id) => {
    const urld = `https://mr-manish-xcell-backend.vercel.app/api/v1/notifications/${id}`;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(urld, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getNotifications();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Notifications</h1>
        <button
          onClick={() => {
            setEdit(false);
            setModalShow(true);
          }}
        >
          Add Notification
        </button>
      </div>
      <AddNotificationModal OpenModal={OpenModal} HandleModal={HandleModal} />

      <div className="myTable">
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>User</th>
              <th>Create Date</th>
              <th>Update date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {not?.map((i, index) => (
              <tr key={index}>
                <td> {i.title} </td>
                <td> {i.message} </td>
                <td>
                  {" "}
                  {i.recipient?.[0]?.userId?.firstName +
                    " " +
                    i.recipient?.[0]?.userId?.middleName +
                    " " +
                    i.recipient?.[0]?.userId?.lastName}{" "}
                </td>
                <th>
                  {new Date(i.updatedAt).toLocaleDateString()}</th>
                <th>{new Date(i.updatedAt).toLocaleDateString()}</th>
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
