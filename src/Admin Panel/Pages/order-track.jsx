import React, {useState, useEffect} from "react";
import { SiderBar } from "../Components/Dashboard/SiderBar";
import { RoleMainSection } from "../Components/Roles/RoleMainSection";
import { MainInfo } from "../Components/Dashboard/MainInfo";
import MainStyle from "../Styles/MainSection.module.css";
import { MdOutlineClose } from "react-icons/md";
import styles from "../Styles/OrderStatusModal.module.css";
import { OrderUpdateStatusModal } from "../Components/Dashboard/OrderUpdateStatusModal";
import { StatusTrack } from "../Components/Dashboard/StatusTrack";
import ProductImg from "../Assets/Product_img.png";
import axios from 'axios';
export const OrderTrack = () => {
    const [tab, setTab] = useState("delivery");
    const [openMod, setOpenMod] = useState(false);
    const [orderTrack, setOrderTrack] = useState([]);
    const [message, setMessage] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
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
      console.log(orderTrack[0]);
      setMessage(orderTrack[0]?.message);
      setTime(orderTrack[0]?.time);
      setDate(orderTrack[0]?.date);
      console.log(time, date, message);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getOrderTrack();
  }, []);


  return (
    <div className={MainStyle.main}>
      <SiderBar />
      <MainInfo />
      <div className="ordertrackcont" style={{color:"#333"}}>
          <p>{date}</p>
          <p>{time}</p>
          <p>{message}</p>
      </div>
    </div>
  );
};
