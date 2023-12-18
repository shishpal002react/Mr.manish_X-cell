import React from "react";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Invoice.module.css";
import { useNavigate } from "react-router-dom";
export const CreateNewInvoice = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Create New Invoice</h1>
        <button onClick={() => navigate("/invoice-details")}>
          Upload Invoice
        </button>
      </div>
      <div className={styles.invoiceMainDiv}>
        <p>Customer Detail's</p>
        <div className={styles.customerDetailDiv}>
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
        <hr />
        <div className={styles.TableDiv}>
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
          <button>+</button>
        </div>
        <div className={styles.TotalAmountDiv}>
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
        <div className={styles.HelpText}>
          <p>
            Payment is required within 14 business days of invoice date. Please
            <br />
            send remittance to hello@reallygreatsite.com.
          </p>
          <p> Thank you for your business.</p>
        </div>
        <button onClick={() => navigate("/invoice-details")}>
          Create Invoice
        </button>
      </div>
    </>
  );
};
