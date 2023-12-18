/** @format */

import React, { useState, useEffect } from "react";
import styles from "../../Styles/DashBoard.module.css";
import {
  MdOutlineDashboardCustomize,
  MdOutlinePrivacyTip,
  MdReportGmailerrorred,
} from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import CityIcon from "../../Assets/City.svg";
import { OrderStatusModal } from "./OrderStatusMadal";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdOutlineClose } from "react-icons/md";
import { OrderUpdateStatusModal } from "./OrderUpdateStatusModal";
import styless from "../../Styles/OrderStatusModal.module.css";
import axios from "axios";

export const SiderBar = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state.AuthReducer.user);
  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };

  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate("/");
  };

  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal4(props) {
    const [fid, setFid] = useState();
    const [ordId, setOrdId] = useState();

    const getPopup = () => {
      setModalShow(true);
    };

    const handleABC = (id, ord_id) => {
      setFid(id);
      setOrdId(ord_id);
      getPopup();
    };

    const [orders, setOrders] = useState([]);
    const urlo = "https://mr-manish-xcell-backend.vercel.app/api/v1/orders";

    const getAllOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(urlo, {
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
        const urlot = `https://mr-manish-xcell-backend.vercel.app/api/v1/orderTrackings/?order_id=${686844604}`;

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
        const message = "order dispatched";

        const urld =
          "https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/orderTrackings";

        const handleSubmit = async (e) => {
          e.preventDefault();
          const token = localStorage.getItem("token");
          try {
            const res = await axios.post(
              urld,
              { orderId: orderId2, date, time, city, state, message },
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
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="orderform">
                <form onSubmit={handleSubmit}>
                  <label for="name">Date</label>
                  <input
                    type="text"
                    onChange={(e) => setDate(e.target.value)}
                  />

                  <label for="name">Time</label>
                  <input
                    type="text"
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <label for="name">City</label>
                  <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <label>State</label>
                  <input
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                  />
                  <button>Submit </button>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
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
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className={styles.ModalMainDiv}>
                <div className={styles.ModalTitleDiv}>
                  <p>Order Status</p>
                  <MdOutlineClose
                    onClick={HandleModal}
                    size={35}
                    className={styles.CloseICon}
                  />
                </div>
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
                        <div
                          className="orderTracktopcont"
                          style={{ marginTop: "5%", marginLeft: "20%" }}
                        >
                          <p>Dispatch Date : {orderTrack?.[0]?.date}</p>
                          <p>Order Id : {orderTrack?.[0]?.order_id}</p>
                          <p>Status As On Today : Arrived At </p>
                        </div>
                        {orderTrack?.map((ele, i) => (
                          <>
                            <div className={styless.Ordercont}>
                              <div className={styless.orderitm}>
                                {ele?.date}
                              </div>
                              <div>
                                <div className={styless.StatusTrackSecondDiv}>
                                  <div
                                    className={
                                      styless.StatusTrackSecondDivIcons
                                    }
                                  >
                                    <GrNotes size={25} />
                                  </div>
                                  <p>{props.track}</p>
                                </div>
                              </div>
                              <div className={styless.orderitm}>
                                {ele?.city}
                              </div>
                              <div className={styless.orderitm}>
                                {ele?.state}
                              </div>
                            </div>
                          </>
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

    const [query, setQuery] = useState("");
    const searchData = !query
      ? orders
      : orders?.filter((item) => {
          return item?.catalogueId?.orderId?.includes(query);
        });

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
          <div className="trackordercont">
            <input
              type="text"
              style={{
                width: "60%",
                marginLeft: "3%",
                height: "40px",
                borderRadius: "4px",
              }}
              placeholder="search by order id"
              onChange={(e) => setQuery(e.target.value)}
            />
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>customer ID</th>
                  <th>Order Date</th>
                  <th>Track</th>
                </tr>
              </thead>
              <tbody>
                {searchData?.map((ele, i) => (
                  <tr>
                    <td>{ele?.catalogueId?.orderId}</td>
                    <td>{ele?._id}</td>
                    <td>{ele?.createdAt}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleABC(ele?.catalogueId?.orderId, ele?._id)
                        }
                      >
                        Track
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Modal.Body>
      </Modal>
    );
  }
  const [mdshw3, setMdShw3] = React.useState(false);

  return (
    <div className={styles.sidebar}>
      <div className={styles.welcomeBox}>
        <h2>Welcome</h2>
        <div>
          <p>Admin</p>
          <p>ID:{user.adminId}</p>
        </div>
      </div>
      <div className={styles.menu}>
        <Link to={"/dashboard"}>
          <div>
            <MdOutlineDashboardCustomize />
            <p>Dashboard</p>
          </div>
        </Link>
        <div
          className={styles.dropdown}
          onClick={() => navigate("/order-track2")}
        >
          <OrderStatusModal OpenModal={OpenModal} HandleModal={HandleModal} />
          <BiCurrentLocation />
          <p>Tracking</p>
          <FiChevronDown
            onClick={() => {
              setShowDropDown(!showDropdown);
            }}
            className={styles.DownIcon}
          />
        </div>
      

        <Link to={"/hubandcities"}>
          <div>
            <img width={"20px"} src={CityIcon} alt={CityIcon} />
            <p>Hub Cities</p>
          </div>
        </Link>
        <Link to={"/branch"}>
          <div>
            <img width={"20px"} src={CityIcon} alt={CityIcon} />
            <p>Branch</p>
          </div>
        </Link>
        <Link to="/notification">
          <div>
            <AiOutlineMessage />
            <p>SMS Notification</p>
          </div>
        </Link>
        <Link to={"/help"}>
          <div>
            <FiHelpCircle />
            <p>Help and Support</p>
          </div>
        </Link>
        <Link to={"/privacy"}>
          <div>
            <MdOutlinePrivacyTip />
            <p>Privacy Policy</p>
          </div>
        </Link>
        <Link to={"/terms"}>
          <div>
            <GrNotes />
            <p>Term & Condition</p>
          </div>
        </Link>
        <Link to={"/roles"}>
          <div>
            <MdReportGmailerrorred />
            <p>Roles</p>
          </div>
        </Link>
        <Link to={"/reports"}>
          <div>
            <BsGraphUpArrow />
            <p>Report</p>
          </div>
        </Link>

        <div onClick={HandleLogout}>
          <HiOutlineLogout />
          <p>Logout</p>
        </div>
      </div>
      <MyVerticallyCenteredModal4
        show={mdshw3}
        onHide={() => setMdShw3(false)}
      />
    </div>
  );
};
