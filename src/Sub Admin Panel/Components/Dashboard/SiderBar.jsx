import React, { useState, useEffect } from "react";
import styles from "../../Styles/DashBoard.module.css";
import {
  MdHistory,
  MdOutlineDashboardCustomize,
  MdOutlineNotificationAdd,
  MdOutlinePrivacyTip,
  MdReportGmailerrorred,
} from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { TbHelpOctagon } from "react-icons/tb";
import { GrNotes } from "react-icons/gr";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import CityIcon from "../../Assets/City.svg";
import { OrderStatusModal } from "./OrderStatusMadal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { StatusTrack } from "./StatusTrack";
import { MdOutlineClose } from "react-icons/md";
import { OrderUpdateStatusModal } from "./OrderUpdateStatusModal";
import { MdPayment } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import styless from "../../Styles/OrderStatusModal.module.css";
import axios from "axios";

export const SiderBar = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };
  const navigate = useNavigate();
  const HandleLogout = () => {
    navigate("/");
  };
  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {
    const [tab, setTab] = useState("delivery");
    const [openMod, setOpenMod] = useState(false);
    const [orderTrack, setOrderTrack] = useState([]);

    const HandleStatusUpdateModal = () => {
      setOpenMod(!openMod);
    };

    const url =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/orderTrackings";

    const getOrderTrack = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrderTrack(res?.data?.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    useEffect(() => {
      if (modalShow) getOrderTrack();
    }, []);

    const [mdshow, setMdShow] = useState(false);

    function MyVerticallyCenteredModal2(props) {
      const [date, setDate] = useState("");
      const [city, setCity] = useState("");
      const [time, setTime] = useState("");
      const [state, setState] = useState("");
      const message = "order dispatched";
      const orderId = "641054b067637f9bc3ec0ab3";

      const urld =
        "https://8vgi9if3ba.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/orderTrackings";

      const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
          const res = await axios.post(
            urld,
            { orderId, date, time, city, state, message },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        //  console.log(res?.data);
          getOrderTrack();
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
                      onClick={() => setTab("customer")}
                      className={tab === "customer" && styless.active}
                    >
                      Update Status
                    </div>
                  </div>
                  {tab === "delivery" ? (
                    <>
                      {orderTrack?.map((ele, i) => (
                        <>
                          <div className={styless.Ordercont}>
                            <div className={styless.orderitm}>{ele?.date}</div>
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
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const [mdshw3, setMdshw3] = useState(false);

  function MyVerticallyCenteredModal3(props) {
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
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.welcomeBox}>
        <h2>Welcome,</h2>
        <div>
          <p>Sub-Admin</p>
          <p>ID:{"123555445"}</p>
        </div>
      </div>
      <div className={styles.menu}>
        <Link to={"/subadmindashboard"}>
          <div>
            <MdOutlineDashboardCustomize />
            <p>Dashboard</p>
          </div>
        </Link>
        <div className={styles.dropdown} onClick={() => navigate("/suborder-track2")}>
    
          <BiCurrentLocation />
          <p>Tracking</p>
          <FiChevronDown
            onClick={() => {
              setShowDropDown(!showDropdown);
            }}
            className={styles.DownIcon}
          />

        </div>
        <div className={styles.dropdown}>
          <Link to="/subadmin-notification">
            <div>
              <MdOutlineNotificationAdd />
              <p>Notifications</p>
            </div>
          </Link>
          <FiChevronDown className={styles.DownIcon} />
        </div>
   
        <Link to={"/subadmin-hubandcities"}>
          <div>
            <img width={"20px"} src={CityIcon} alt={CityIcon} />
            <p>Hub Cities</p>
          </div>
        </Link>
        <Link to={"/subadmin-notification"}>
          <div>
            <AiOutlineMessage />
            <p>SMS Notification</p>
          </div>
        </Link>
        <Link to={"/subadmin-help"}>
          <div>
            <FiHelpCircle />
            <p>Help and Support</p>
          </div>
        </Link>
        <Link to={"/subadmin-roles"}>
          <div>
            <MdReportGmailerrorred />
            <p>Roles</p>
          </div>
        </Link>
        <Link to={"/subadmin-reports"}>
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModal3
        show={mdshw3}
        onHide={() => setMdshw3(false)}
      />
    </div>
  );
};
