import React, {useState, useEffect} from "react";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import styles from "../../Styles/PrivacyPolicy.module.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';


export const PrivacyMainSection = () => {

  const [privacyPol, setPrivacyPol] = useState("");
  const url = "https://mr-manish-xcell-backend.vercel.app/api/v1/privacy";

  const getPrivacy = async ()=>{
    const token = localStorage.getItem("token");
    try{
      const res = await axios.get(url,
        {
          headers:{Authorization:`Bearer ${token}`}
        }
      )
      setPrivacyPol(res?.data?.data?.content);
    }catch(err){
      console.log(err.message);
    }
  };

  useEffect(()=>{
    getPrivacy();
  },[])

  function MyVerticallyCenteredModal(props) {
    const ud = localStorage.getItem("token");
    const [content, setContent] = useState("");
    const image = "https://i.mydramalist.com/R6W7x_5f.jpg";
    //console.log(image, productId, productName, stock, quantity, price);
    //const dispatch = useDispatch();
    const urla = "https://mr-manish-xcell-backend.vercel.app/api/v1/privacy";
    const handleClick = async (e)=>{
      e.preventDefault();
      try{
        //console.log(image, productId, productName, stock, quantity, price);
        const res = await axios.post(urla,
          {content} ,
          {
           headers :{
            Authorization:`Bearer ${ud}`,
           }
          } 
        )
       // console.log(res?.data);
      // dispatch(getTerms());
        getPrivacy();
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
          <label >Privacy Policy</label>
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
        <h1 className={stylesfromDash.Title}>Privacy Policy</h1>
        <button onClick={()=>setModalShow(true)}>Add</button>
      </div>
      <hr style={{ width: "90%", marginTop: "-10px" }} />
      <div className={styles.TextSection}>
        <p>
          {privacyPol}
        </p>

      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
