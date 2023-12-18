import React, { useEffect, useState } from "react";
import styles from "../../Styles/DashBoard.module.css";
import { MdOutlineEditNote } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CiExport, CiImport } from "react-icons/ci";
import {
  BsBuildingFillCheck,
  BsFillBoxFill,
  BsFilterLeft,
} from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { FiFilter } from "react-icons/fi";
import { MainInfo } from "./MainInfo";
import { OrderStatusModal } from "./OrderStatusMadal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getAllProducts,
  GetBranches,
} from "../../../Redux/Auth/action";
import FileSaver from "file-saver";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

export const MainSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [p_id, setP_id] = useState("");
  const [modalShowEditProduct, setModalShowEditProduct] = React.useState(false);
  const branches = useSelector((state) => state.AuthReducer.branches);
  const products = useSelector((state) => state.AuthReducer.products);
  const orders = useSelector((state) => state.AuthReducer.orders);
  const [users, setUsers] = useState(0);
  const [tab, setTab] = useState("order");
  const [OpenModal, setOpenModal] = useState(false);

  const BaseUrl = "https://mr-manish-xcell-backend.vercel.app/";

  const ongoingOrders = orders?.filter((item) => {
    return item?.orderStatus === "ongoing";
  });

  const completedOrders = orders?.filter((item) => {
    return item?.orderStatus === "delivered";
  });

  const fetchCustomer = async () => {
    try {
      const res = await axios.get(
        "https://mr-manish-xcell-backend.vercel.app/api/v1/users"
      );
      setUsers(res?.data?.data?.data?.length);
    } catch {}
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const [query, setQuery] = useState("");

  const searchData = !query
    ? orders
    : orders?.filter((item) => {
        return (
          item?.customerId?.includes(query) || item?.orderId?.includes(query)
        );
      });
  const ongoingsearchData = !query
    ? ongoingOrders
    : ongoingOrders?.filter((item) => {
        return item?.catalogueId?.orderId?.includes(query);
      });
  const completedsearchData = !query
    ? completedOrders
    : completedOrders?.filter((item) => {
        return item?.catalogueId?.orderId?.includes(query);
      });

  // api is not working proparly
  const urldown = "http://localhost:8877/api/v1/download";

  const getDownloads = async () => {
    try {
      const res = await fetch(urldown);
      const blob = await res.blob();
      FileSaver.saveAs(blob, "orders.xlsx");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    dispatch(GetBranches());
    dispatch(getAllProducts());
    dispatch(getAllOrders());
  }, [dispatch]);
  const HandleModal = () => {
    setOpenModal(!OpenModal);
  };

  const handleDownload = () => {
    getDownloads();
  };

  const url = "http://localhost:8877/api/v1/upload";

  const handleUpload = async (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("file", files);
    try {
      await axios.post(url, formData);
    } catch (error) {
      console.log(error);
    }
  };

  // order screen
  function MyVerticallyCenteredModalForEditOrder(props) {
    const ud = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [orderId, setOrderId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [totalPackages, setTotalPackages] = useState("");
    const image = "https://i.mydramalist.com/R6W7x_5f.jpg";

    //console.log(image, productId, productName, stock, quantity, price);
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `https://mr-manish-xcell-backend.vercel.app/api/v1/orders/${p_id}`,
            {
              headers: {
                Authorization: `Bearer ${ud}`,
              },
            }
          );
          setName(data.data.name);
          setOrderId(data.data.orderId);
          setCustomerId(data.data.customerId);
          setTotalAmount(data.data.totalAmount);
          setTotalPackages(data.data.totalPackages);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [p_id]);

    const url = `https://mr-manish-xcell-backend.vercel.app/api/v1/admin/orders/${p_id}`;
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.patch(
          url,
          { name, orderId, customerId, totalAmount, totalPackages },
          {
            headers: {
              Authorization: `Bearer ${ud}`,
            },
          }
        );
        console.log(res?.data);
        console.log("after modal");
        fetchCustomer();
        dispatch(getAllProducts());
        props.onHide();
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
            <label>Patient Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />

            <label>Order Id</label>
            <input
              type="text"
              id="orderId"
              name="orderId"
              value={orderId}
              required
              onChange={(e) => setOrderId(e.target.value)}
            />

            <label>Patient Id</label>
            <input
              type="text"
              id="customerId"
              name="customerId"
              value={customerId}
              required
              onChange={(e) => setCustomerId(e.target.value)}
            />

            <label>Total Amount</label>
            <input
              type="text"
              id="totalAmount"
              name="totalAmount"
              value={totalAmount}
              required
              onChange={(e) => setTotalAmount(e.target.value)}
            />
            <label>Total Packages</label>
            <input
              type="text"
              id="totalPackages"
              name="totalPackages"
              value={totalPackages}
              required
              onChange={(e) => setTotalPackages(e.target.value)}
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

  const handleEditOrder = (o_id) => {
    setP_id(o_id);
    setModalShowEditProduct(true);
  };

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

  function Openeer() {
    const targ = document.getElementById("file");
    targ.click();
  }

  return (
    <div className={styles.mainSection}>
      <MainInfo />
      <OrderStatusModal OpenModal={OpenModal} HandleModal={HandleModal} />
      <div className={styles.mainGrid}>
        <div onClick={() => navigate("/branch")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Branch</p>
              <span>{branches?.length}</span>
            </div>
            <div>
              <BsBuildingFillCheck />
            </div>
          </div>
        </div>
        <div onClick={() => navigate("/totalcustomer")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Customer</p>
              <span> {users} </span>
            </div>
            <div>
              <FcBusinessman />
            </div>
          </div>
        </div>
        <div onClick={() => navigate("/totalproducts")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Products</p>
              <span>{products?.length}</span>
            </div>
            <div>
              <BsFillBoxFill />
            </div>
          </div>
        </div>
        <div onClick={() => navigate("/totalorders")}>
          <div className={styles.mainGridSubChild}>
            <div>
              <p>Total Orders</p>
              <span>{orders?.length}</span>
            </div>
            <div>
              <MdOutlineEditNote />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainOrderSection}>
        <h1 className={styles.Title}>Order's Details</h1>
        <div className={styles.TabTitle}>
          <div
            onClick={() => setTab("order")}
            className={tab === "order" && styles.active}
          >
            All Orders
          </div>
          <div
            onClick={() => setTab("ongoing")}
            className={tab === "ongoing" && styles.active}
          >
            Ongoing({ongoingOrders?.length})
          </div>
          <div
            onClick={() => setTab("complated")}
            className={tab === "complated" && styles.active}
          >
            Completed({completedOrders?.length})
          </div>
        </div>
        <hr />
        <div className={styles.filterSection}>
          <div>
            <div>
              <AiOutlineSearch className={styles.filterSectionIconSearch} />
              <input
                type="text"
                placeholder="Search by order Id,Customer Id"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button>Search</button>
          </div>
          <div>
            <FiFilter className={styles.filterSectionIcon} />
            <BsFilterLeft className={styles.filterSectionIcon} />
            {/* <form>
              <input onChange={handleUpload} type="file">
                <CiImport className={styles.filterSectionIconBtn} />
                Import
              </input>
            </form> */}
            <input
              type="file"
              id="file"
              onChange={(e) => handleUpload(e)}
              name="img"
              style={{ display: "none" }}
            ></input>

            <button onClick={Openeer}>
              <CiExport className={styles.filterSectionIconBtn} />
              Import
            </button>

            <button onClick={handleDownload}>
              <CiExport className={styles.filterSectionIconBtn} />
              Export
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Order Id</th>
              <th>Patient Id</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Total Packages</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tab === "order"
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
                      <td>
                        <button onClick={() => handleEditOrder(ele?._id)}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDeleteOrder(ele?._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))
              : tab === "ongoing"
              ? ongoingsearchData?.map((ele, i) => (
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
                      <td>
                        <button onClick={() => handleEditOrder(ele?._id)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  </>
                ))
              : completedsearchData?.map((ele, i) => (
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
                      <td>
                        <button onClick={() => handleEditOrder(ele?._id)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
          </tbody>
        </table>
      </div>
      <MyVerticallyCenteredModalForEditOrder
        show={modalShowEditProduct}
        onHide={() => setModalShowEditProduct(false)}
      />
    </div>
  );
};
