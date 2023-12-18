import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styless from "../Styles/OrderStatusModal.module.css";
import styles from "../Styles/DashBoard.module.css";
import { MainSection } from "../Components/Dashboard/MainSection";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { MainInfo } from "../Components/Dashboard/MainInfo";
import { BiCurrentLocation } from "react-icons/bi";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { TbHelpOctagon } from "react-icons/tb";
import { GrNotes } from "react-icons/gr";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import CityIcon from "../Assets/City.svg";
import { OrderStatusModal } from "../Components/Dashboard/OrderStatusMadal";
import { useSelector } from "react-redux";

import { MdOutlineClose } from "react-icons/md";
import { OrderUpdateStatusModal } from "../Components/Dashboard/OrderUpdateStatusModal";

const SubOrderTrack2 = () => {
  const [orders, setOrders] = useState([]);
  const url =
    "https://mr-manish-xcell-backend.vercel.app/api/v1/orders";

  const getAllOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  const [id, setId] = useState();
  const [ordId, setOrdId] = useState();

  const handleClick = (idi, ide) => {
    //  console.log(id, ide);
    setId(idi);
    setOrdId(ide);
    setModalShow(true);
  };

  function MyVerticallyCenteredModal(props) {
    const [tab, setTab] = useState("delivery");
    const [openMod, setOpenMod] = useState(false);

    const HandleStatusUpdateModal = () => {
      setOpenMod(!openMod);
    };
    const [orderTrack, setOrderTrack] = useState([]);
    const [orderId, setOrderId] = useState();

    const getOrderTrackById = async () => {
      const token = localStorage.getItem("token");
      const urlot = `https://mr-manish-xcell-backend.vercel.app/api/v1/orderTrackings/?order_id=${id}`;

      try {
        const res = await axios.get(urlot, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrderTrack(res?.data?.data);
        setOrderId(res?.data?.data?.[0]?.orderId);
      } catch (err) {
        console.log(err.message);
      }
    };

    useEffect(() => {
      if (modalShow) {
        getOrderTrackById();
      }
    }, []);

    const [mdshow, setMdShow] = useState(false);

    function MyVerticallyCenteredModal2(props) {
      const [date, setDate] = useState("");
      const [city, setCity] = useState("");
      const [time, setTime] = useState("");
      const [state, setState] = useState("");
      const [orderId2, setOrderId] = useState();
      const [orderId3, setOrderId3] = useState();
      const message = "order dispatched";

      const urld =
        "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/orderTrackings";

      const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const orderId4 = orderId2 === undefined ? orderId3 : orderId2;

        try {
          const res = await axios.post(
            urld,
            { orderId: orderId4, date, time, city, state, message },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          getOrderTrackById();
        } catch (err) {
          console.log(err.message);
        }
      };

      useEffect(() => {
        setOrderId(orderId);
        setOrderId3(ordId);
      }, []);


      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update Status
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="orderform">
              <form onSubmit={handleSubmit}>
                <label for="name">Date</label>
                <input type="text" onChange={(e) => setDate(e.target.value)} />

                <label for="name">Time</label>
                <input type="text" onChange={(e) => setTime(e.target.value)} />
                <label for="name">City</label>
                <input type="text" onChange={(e) => setCity(e.target.value)} />

                <label>State</label>
                <input type="text" onChange={(e) => setState(e.target.value)} />
                <button>Submit </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      );
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
         Order Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className={styles.ModalMainDiv}>
              {/* <div className={styles.ModalTitleDiv}>
                <p>Order Status</p>
                <MdOutlineClose size={35} className={styles.CloseICon} />
              </div> */}
              <div className={styles.Main}>
                <div className={styles.MainFirstDiv}>
                  <div className={styles.TabTitle}>
                    <div
                      onClick={() => setTab("delivery")}
                      className={tab === "delivery" && styless.active}
                    >
                      Delivery Status
                    </div>
                    <div
                      onClick={() => {
                        setTab("customer");
                        setOrderId(orderId);
                      }}
                      className={tab === "customer" && styless.active}
                    >
                      Update Status
                    </div>
                  </div>
                  {tab === "delivery" ? (
                    <>
                      {console.log(orderTrack)}
                      <div
                        className="orderTracktopcont"
                        style={{ marginTop: "5%", marginLeft: "20%" }}
                      >
                        <p>Dispatch Date : {orderTrack?.[0]?.date}  </p>
                        <p>Order Id : {orderTrack?.[0]?.order_id}</p>
                        <p>
                          Status As On Today : Arrived At{" "}
                          {orderTrack?.[orderTrack.length - 1]?.city}
                        </p>
                      </div>
                      {orderTrack?.map((ele, i) => (
                          <div className={styless.Ordercont} key={i} >
                            <div className={styless.orderitm}>{ele?.date} {ele?.time} </div>
                            <div>
                              <div className={styless.StatusTrackSecondDiv}>
                                <div
                                  className={styless.StatusTrackSecondDivIcons}
                                >
                                  <GrNotes size={25} />
                                </div>
                                <p>{props.track}</p>
                              </div>
                            </div>
                            <div className={styless.orderitm}>{ele?.city}</div>
                            <div className={styless.orderitm}>{ele?.state}</div>
                          </div>
                       
                      ))}
                    </>
                  ) : (
                    <div className={styless.customerSection}>
                      <div className={styless.customerSectionBtn}>
                        <OrderUpdateStatusModal
                          OpenModal={openMod}
                          HandleModal={HandleStatusUpdateModal}
                        />
                        <button onClick={() => setMdShow(true)}>
                          Update Status
                        </button>
                      </div>

                      <MyVerticallyCenteredModal2
                        show={mdshow}
                        onHide={() => setMdShow(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className={styles.main}>
      <SiderBar />
      <div className={styles.mainSection}>
        <MainInfo />
        <table style={{ width: "90%", margin: "40px" }}>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer Id</th>
              <th>Order Date</th>
              <th>Track</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((ele, i) => (
              <tr>
                <td>{ele?.catalogueId?.orderId}</td>
                <td>{ele?._id}</td>
                <td>{ele?.createdAt}</td>
                <td>
                  <button
                    onClick={() =>
                      handleClick(ele?.catalogueId?.orderId, ele?._id)
                    }
                  >
                    Track
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </table>
      </div>
    </div>
  );
};

export default SubOrderTrack2;