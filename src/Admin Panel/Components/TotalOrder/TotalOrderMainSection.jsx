import React, { useEffect, useState } from "react";
import styles from "../../Styles/TotalOrder.module.css";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { CiExport, CiImport } from "react-icons/ci";
import { BsFilterLeft } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../Redux/Auth/action";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const TotalOrderMainSection = () => {
  const [tab, setTab] = useState("all");
  const orders = useSelector((state) => state.AuthReducer.orders);
  const navigate = useNavigate();
  //console.log(orders);
  const BaseUrl = "https://mr-manish-xcell-backend.vercel.app/";
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  console.log(orders);
  const orderedData = [
    {
      order_id: 122,
      customer_id: 222,
      package: "kidney",
      date: "12/12/2222",
      location: "delhi",
    },
    {
      order_id: 122,
      customer_id: 222,
      package: "kidney",
      date: "12/12/2222",
      location: "delhi",
    },
  ];

  let newOrder = [];
  if (orders?.length <= 3) newOrder = orders;
  else newOrder = orders?.slice(0, 3);
  // const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState();

  const searchData = !query
    ? orders
    : orders?.filter((item) => {
        return (
          item?.customerId?.includes(query) || item?.orderId?.includes(query)
        );
      });

  /*const HandleSearch = (e) => {
    const { value } = e.target;
    if (value === "") {
      setSearchData(orders);
    } else {
      //console.log(value);
      const temp = orders.filter((item) => {
        console.log(item?.catalogueId.orderId);
        return (
          item?.catalogueId.orderId?.toString()?.includes(value.toString())
        );
      });
      setSearchData(temp);
    }
    //console.log(searchData);
  };*/

  const [modalShow, setModalShow] = React.useState(false);

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [customer, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [customerId, setCid] = useState("");
    const [order_id, setOid] = useState("");
    const [orderType, setOtype] = useState("");
    const [orderDate, setDate] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [totalAmount, setTamt] = useState("");
    const [totalPackages, setTpack] = useState("");

    //const dispatch = useDispatch();
    const urla = "https://mr-manish-xcell-backend.vercel.app/api/v1/order-add";
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          urla,
          {
            name,
            customerId,
            order_id,
            orderType,
            orderDate,
            city,
            state,
            totalAmount,
            totalPackages,
          },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        console.log(res?.data);
        navigate("/totalorders");
        toast.success("Order is create successfully");
        dispatch(getAllOrders());
        props.onHide();

        //  dispatch(GetBranches());
      } catch (err) {
        toast.error(
          err?.data?.response?.message || "An unknown error occurred"
        );
      }
    };

    //tota; order
    const url = "https://mr-manish-xcell-backend.vercel.app/api/v1/users";

    const getAllUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(res?.data?.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    useEffect(() => {
      if (props.show === true) {
        getAllUsers();
      }
    }, [props]);

    //console.log(branch);
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
            {/* <label>Patient Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            /> */}
            <label>Patient Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Patient Id</label>
            <Form.Select
              className="mb-3"
              onChange={(e) => {
                setCid(e.target.value);
              }}
            >
              <option>Select Patient</option>
              {customer?.map((i, index) => (
                <option value={i.customerId} key={index}>
                  {`${i.firstName} ${i.middleName} ${i.lastName} Patient Id :${i.customerId}`}
                </option>
              ))}
            </Form.Select>

            {customerId && (
              <div>
                {customer?.slice(0, 1)?.map((i, index) => (
                  <>
                    <h4>Customer Detail</h4>
                    <p> {`${i.firstName} ${i.middleName} ${i.lastName} `}</p>
                    <p>CustomerId {i?.customerId}</p>
                    <p>Phone {i?.phone}</p>
                    <p>Email{i?.email}</p>
                    <p>Gender {i?.gender}</p>
                    <p>BloodGroup {i?.bloodGroup}</p>
                    <p> Address {`${i.firstLineAddress} `}</p>
                    <p>{`${i?.district} ${i?.state} ${i?.country} `}</p>
                  </>
                ))}
              </div>
            )}

            <label>Order Id</label>
            <input
              type="text"
              onChange={(e) => setOid(e.target.value)}
              required
            />
            <label>Patient Order Type</label>
            <input
              type="text"
              onChange={(e) => setOtype(e.target.value)}
              placeholder="Example Medical ..."
              required
            />

            <label>Order Date</label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <label>city</label>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <label>state</label>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              required
            />
            <label>Invoice Amount</label>
            <input
              type="text"
              onChange={(e) => setTamt(e.target.value)}
              required
            />
            <label>Total Number of Boxes</label>
            <input
              type="text"
              onChange={(e) => setTpack(e.target.value)}
              required
            />

            <button type="submit">Add Order</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  /// delete order
  const handleDeleteOrder = async (o_id) => {
    await axios.delete(`${BaseUrl}api/v1/admin/orders/${o_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(getAllOrders());
    toast.success("Order delete Successfully", {
      position: "top-center",
    });
  };

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Total Orders(100)</h1>
        <div className={styles.mainOrder}>
          <p>Order's Details</p>
        </div>
        <div className={styles.mainOrder}>
          <button onClick={() => setModalShow(true)}>Create Order</button>
        </div>
        <div className={styles.TabTitle}>
          <div
            onClick={() => setTab("all")}
            className={tab === "all" && styles.active}
            style={{ marginBottom: "3%", height: "40px" }}
          >
            All Orders
          </div>
          <div
            onClick={() => setTab("new")}
            className={tab === "new" && styles.active}
          >
            New
          </div>
          {/*<div
            onClick={() => setTab("ongoing")}
            className={tab === "ongoing" && styles.active}
          >
            Ongoing
  </div>
          <div
            onClick={() => setTab("complated")}
            className={tab === "complated" && styles.active}
          >
            Complated
  </div>*/}
        </div>
        <hr />
        <div className={styles.filterSection}>
          <div>
            <div>
              <AiOutlineSearch className={styles.filterSectionIconSearch} />
              <input
                type="text"
                placeholder="Search by order Id, patient Id"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div>
            <FiFilter className={styles.filterSectionIcon} />
            <BsFilterLeft className={styles.filterSectionIcon} />
            <button>
              <CiImport className={styles.filterSectionIconBtn} />
              Import
            </button>
            <button>
              <CiExport className={styles.filterSectionIconBtn} />
              Export
            </button>
          </div>
        </div>
        <div className={styles.MainTableDiv}>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Order Id</th>
                <th>Patient Id</th>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Total Packages</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tab === "all"
                ? searchData?.map((ele) => (
                    <>
                      <tr>
                        <td>{ele?.name}</td>
                        <td>
                          {ele?.catalogueId?.orderId
                            ? ele?.catalogueId?.orderId
                            : ele?.orderId}
                        </td>
                        <td>{ele?.customerId}</td>
                        <td>{ele?.createdAt}</td>
                        <td>{ele?.totalAmount}</td>
                        <td>{ele?.totalPackages}</td>
                        <button onClick={() => handleDeleteOrder(ele?._id)}>
                          Delete
                        </button>
                        <td></td>
                      </tr>
                    </>
                  ))
                : tab === "new"
                ? newOrder.map((ele) => (
                    <>
                      <tr>
                        <td>{ele?.catalogueId?.orderId}</td>
                        <td>{ele?.catalogueId?.name}</td>
                        <td>{ele?.totalPackages}</td>
                        <td>{ele?.createdAt}</td>
                        <td>{ele?.address}</td>
                        {/*<td>
                      <button>Details</button>
                </td>*/}
                      </tr>
                    </>
                  ))
                : orderedData.map((ele) => (
                    <>
                      <tr>
                        <td>{ele.order_id}</td>
                        <td>{ele.customer_id}</td>
                        <td>{ele.package}</td>
                        <td>{ele.date}</td>
                        <td>{ele.location}</td>
                        {/*<td>
                      <button>Details</button>
                </td>*/}
                      </tr>
                    </>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
