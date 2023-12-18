import React from "react";

import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Invoice.module.css";
export const InvoiceDetailsMainSection = () => {
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Create New Invoice</h1>
      </div>
      <div className={styles.InvoiceDiv}>
        <div className={styles.HeaderSection}>
          <h1>Invoice</h1>
          <div className={styles.HeadercustomerDetailDiv}>
            <div>
              <div>
                <h2>Name:</h2>
                <p>Rahul Sharma</p>
              </div>
              <div>
                <h2>Address:</h2>
                <p>A-Block, Sector 66, Noida, 4234065</p>
              </div>
              <div>
                <h2>Issued to:</h2>
                <p>
                  company Name
                  <br />
                  A-Block, Sector 66, Noida, 4234065
                </p>
              </div>
            </div>
            <div>
              <div>
                <h2>Date:</h2>
                <p>DD/MM/YYYY</p>
              </div>
              <div>
                <h2>Invoice No:</h2>
                <p>DD/MM/YYYY</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.TableMainDiv}>
          <div>
            {" "}
            <div className={styles.InvoiceTableDiv}>
              <table>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Rate(Rs./qty)</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Dialysis Machine</td>
                    <td>10</td>
                    <td>4555</td>
                    <td>&#x20b9;50000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.InvoiceTotalAmountDiv}>
              <div>
                <div>
                  <p>Subtotal:</p>
                  <h2>&#x20b9;50000</h2>
                </div>
                <div>
                  <p>Tax:</p>
                  <h2>&#x20b9;500</h2>
                </div>
                <div>
                  <p>Delivery Charges:</p>
                  <h2>&#x20b9;50</h2>
                </div>
                <div>
                  <p>Total:</p>
                  <h2>&#x20b9;555000</h2>
                </div>
              </div>
            </div>
            <div className={styles.InvoiceHelpText}>
              <p>
                Payment is required within 14 business days of invoice date.
                Please
                <br />
                send remittance to hello@reallygreatsite.com.
              </p>
              <p> Thank you for your business.</p>
            </div>
          </div>
        </div>
        <button>Send Invoice</button>
      </div>
    </div>
  );
};
