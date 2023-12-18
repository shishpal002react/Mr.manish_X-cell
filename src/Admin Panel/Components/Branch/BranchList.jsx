import React from "react";
import styles from "../../Styles/Branch.module.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";


export const BranchList = ({ data, key, HandleBranchLoginModal }) => {
  const [modalShow, setModalShow] = React.useState(false);


  function MyVerticallyCenteredModal(props) {
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
          <Button onClick={()=>{
            console.log("jhgtt")
            setModalShow(false)}}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  return (
    <div key={key} className={styles.BranchList} onClick={() => setModalShow(true)}>
      <div>
        <h2>{data.branch}</h2>
        <p>{data.branch_add}</p>
      </div>
     {/* <button onClick={HandleBranchLoginModal}>Login</button> */}
     <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
