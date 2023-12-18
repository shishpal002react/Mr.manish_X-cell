/** @format */

import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Report.module.css";
import { ReportGraph } from "./ReportGraph";
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { setsEqual } from "chart.js/dist/helpers/helpers.core";

export const ReportMainSection = () => {
  const [barData, setBarData] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [not, setNot] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const token = localStorage.getItem("token");

  const getBarData = async () => {
    try {
      const res = await axios.get(
        // change url to give a query
        "https://mr-manish-xcell-backend.vercel.app/api/v1/countorders?groupBy=date",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBarData(res?.data?.data);
      console.log(res.data);
      setOrderCount(res?.data?.data?.length);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getBarData();
  }, []);

  const url = `https://mr-manish-xcell-backend.vercel.app/api/v1/orders?startOfDay=${startDate}&endOfDay=${endDate}`;

  const getDateInInterval = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNot(res?.data?.data);
      console.log("data is show ===>");
      console.log(res.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // useEffect(() => {
  //   getNotifications();
  // }, []);

  const lab = [];
  const bar_data = [];
  barData?.map((item) => {
    lab.push(item?.date);
    bar_data.push(item?.orderCount);
  });
  const chartData = {
    labels: lab,
    datasets: [
      {
        data: bar_data,
        backgroundColor: "#6092C0",
        barThickness: "60",
        padding: "5",
      },
    ],
  };

  // date features apply
  const handleStartAndEndDate = () => {
    console.log(startDate);
    console.log(endDate);
    getDateInInterval();
  };

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <Form className="d-flex mt-4">
        <Form.Control
          type="date"
          placeholder="Start Date"
          onChange={(e) => setStartDate(e.target.value)}
        ></Form.Control>
        <Form.Control
          type="date"
          placeholder="End Date"
          className="mt-2"
          onChange={(e) => setEndDate(e.target.value)}
        ></Form.Control>
        <Button
          className="mt-2"
          type="button"
          onClick={() => handleStartAndEndDate()}
        >
          Show Information
        </Button>
      </Form>

      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Total Orders ({orderCount}) </h1>
      </div>
      <div className={styles.ReportGraph}>
        <div>
          <p>Order's Report</p>
          <div>
            {/* <GrRefresh
              size={20}
              color="#2A3A8F"
              style={{ cursor: "pointer" }}
            /> */}
            {/* <select>
              <option value="">This Month</option>
            </select>
            <select>
              <option value="">Company A</option>
            </select> */}
          </div>
        </div>
        <ReportGraph chartData={chartData} />
      </div>
      {not.length !== 0 && (
        <div className="myTable">
          <Table>
            <thead>
              <tr>
                <th>CustomerId</th>
                <th>OrderType</th>
                <th>PaymentStatus</th>
                <th>PlacedOn</th>
                <th>TotalAmount</th>
                <th>TotalPackages</th>
              </tr>
            </thead>
            <tbody>
              {not?.map((i, index) => (
                <tr key={index}>
                  <td> {i.customerId} </td>
                  <td> {i.orderType} </td>
                  <th>{i.paymentStatus}</th>
                  <th>{new Date(i.placedOn).toLocaleDateString()}</th>
                  <th>{i.totalAmount}</th>
                  <th>{i.totalPackages}</th>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};
