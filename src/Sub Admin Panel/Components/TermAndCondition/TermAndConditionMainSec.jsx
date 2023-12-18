import React, { useEffect, useState } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/PrivacyPolicy.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTerms } from "../../../Redux/Auth/action";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
export const TermAndConditionMainSec = () => {
  const terms = useSelector((state) => state.AuthReducer.terms);
  const dispatch = useDispatch();
  console.log(terms);
  useEffect(() => {
    dispatch(getTerms());
  }, [dispatch]);

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [content, setContent] = useState("");
    const image = "https://i.mydramalist.com/R6W7x_5f.jpg";
    //console.log(image, productId, productName, stock, quantity, price);
    const dispatch = useDispatch();
    const url = "https://mr-manish-xcell-backend.vercel.app/api/v1/admin/terms";
    const handleClick = async (e)=>{
      e.preventDefault();
      try{
        //console.log(image, productId, productName, stock, quantity, price);
        const res = await axios.post(url,
          {content} ,
          {
           headers :{
            Authorization:`Bearer ${ud}`,
           }
          } 
        )
       // console.log(res?.data);
       dispatch(getTerms());
      }catch(err){
        console.log(err.message);
      }
    }
   // console.log(image, productId, productName, stock, quantity, price);
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
          <label >Terms</label>
          <input type="text" id="name" name="name" required onChange={(e)=>setContent(e.target.value)}/>
          <input type="submit" value="Submit" />
        </form>
  
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  const [modalShow, setModalShow] = React.useState(false);  

  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.main}>
        <h1 className={stylesfromDash.Title}>Terms and Condition</h1>
        {/*<button onClick={()=>setModalShow(true)}>Add</button>*/}
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.TextSection}>
        <p>{terms?.content}</p>
      </div>
      <div className={styles.termAndConditionLastDiv}>
        <div>
          <input type="checkbox" />
          <p>I agree my consent with following terms and condition </p>
        </div>
        <button>Agree</button>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
