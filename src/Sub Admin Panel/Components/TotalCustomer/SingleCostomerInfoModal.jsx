import React from "react";
import { BsEyeFill } from "react-icons/bs";
import { ImArrowLeft2 } from "react-icons/im";
import styles from "../../Styles/TotalCustomer.module.css";
export const SingleCostomerInfoModal = ({ openModal, HandleModal }) => {
  return (
    <div className={openModal ? styles.modalVisible : styles.modal}>
      <div className={styles.ModalMainDiv}>
        <div className={styles.ModalTitleDiv}>
          <ImArrowLeft2
            onClick={HandleModal}
            size={25}
            className={styles.CloseICon}
          />
          <h2>Customer Info</h2>
        </div>
        <div className={styles.mainInfoDiv}>
          <div>
            <p>Personal Information</p>
          </div>
          <div>
            <div className={styles.mainInfoSecondDiv}>
              <div>
                <p>First Name</p>
                <h2>Suraj</h2>
              </div>
              <div>
                <p>Middle Name</p>
                <h2>Suraj</h2>
              </div>
              <div>
                <p>Last Name</p>
                <h2>Sharma</h2>
              </div>
            </div>
            <div className={styles.mainInfoSecondDiv}>
              <div>
                <p>Date Of Birth</p>
                <h2>12/12/2000</h2>
              </div>
              <div>
                <p>Gender</p>
                <h2>Male</h2>
              </div>
              <div>
                <p>Marrital Status</p>
                <h2>Unmarried</h2>
              </div>
            </div>
            <div className={styles.mainInfoSecondDiv}>
              <div>
                <p>Relative Name</p>
                <h2>Suraj</h2>
              </div>
              <div>
                <p>Relation </p>
                <h2>Brother</h2>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className={styles.mainInfoDiv}>
          <div>
            <p>Contact Information</p>
          </div>
          <div>
            <div className={styles.mainInfoSecondDiv}>
              <div>
                <p>Mobile Number1</p>
                <h2>888787878787</h2>
              </div>
              <div>
                <p>Alternative Mobile Number</p>
                <h2>8788788787</h2>
              </div>
              <div></div>
            </div>
            <div className={styles.mainInfoSecondDiv}>
              <div>
                <p>Email</p>
                <h2>Suraj@gmail.com</h2>
              </div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className={styles.mainInfoDiv}>
          <div>
            <p>Medical Information</p>
          </div>
          <div>
            <div className={styles.mainInfoSecondDiv}>
              <div>
                <p>Doctor Name</p>
                <h2>Sharma</h2>
              </div>
              <div>
                <p>Hospital Name</p>
                <h2>JJ Hospital</h2>
              </div>
              <div>
                <p>Blood Group</p>
                <h2>O+</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainInfoDiv}>
          <div>
            <p>Address Information</p>
          </div>
          <div>
            <div className={styles.mainInfoSecondDiv}>
              <div style={{ width: "100%" }}>
                <p>Address Line 1</p>
                <h2>A 66, Sector 63, Noida, Utter Pradesh 423456</h2>
              </div>
            </div>
            <div className={styles.mainInfoSecondDiv}>
              <div style={{ width: "100%" }}>
                <p>Address Line 2</p>
                <h2>A 66, Sector 63, Noida, Utter Pradesh 423456</h2>
              </div>
            </div>
            <div className={styles.mainInfoSecondDiv}>
              <div>
                <p>Country</p>
                <h2>India</h2>
              </div>
              <div>
                <p>State</p>
                <h2>UP</h2>
              </div>
              <div>
                <p>District</p>
                <h2>Noida</h2>
              </div>
            </div>
            <div className={styles.mainInfoSecondDiv}>
              <div>
                <p>Pin-Code</p>
                <h2>454545</h2>
              </div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className={styles.mainInfoDiv}>
          <div>
            <p>Document Uploaded</p>
          </div>
          <div>
            <div className={styles.mainInfoSecondDiv}>
              <div>
                <p>Document 1</p>
                <h2>Document 1</h2>
                <BsEyeFill
                  cursor={"pointer"}
                  style={{ width: "50%", margin: "auto" }}
                  color="#C5161D"
                />
              </div>
              <div>
                <p>Document 2</p>
                <h2>Document 2 </h2>
                <BsEyeFill
                  cursor={"pointer"}
                  style={{ width: "50%", margin: "auto" }}
                  color="#C5161D"
                />
              </div>
              <div>
                <p>Document 3</p>
                <h2>Document 3</h2>
                <BsEyeFill
                  cursor={"pointer"}
                  style={{ width: "50%", margin: "auto" }}
                  color="#C5161D"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
