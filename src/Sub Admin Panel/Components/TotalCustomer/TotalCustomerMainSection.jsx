import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/TotalCustomer.module.css";
import { BsEyeFill } from "react-icons/bs";
import { SingleCostomerInfoModal } from "./SingleCostomerInfoModal";
import { AddCustomerModal } from "./AddCustomerModal";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export const TotalCustomerMainSection = () => {
  const [tab, setTab] = useState("all");
  const [CustomerInfoModal, setCustomerInfoModal] = useState(false);
  const [addCustModal, setAddCustModal] = useState(false);
  const [customer, setCustomer] = useState([]);
  const HandleModal = () => {
    setCustomerInfoModal(!CustomerInfoModal);
  };
  const HandleAddCustoModal = () => {
    setAddCustModal(!addCustModal);
  };

  const getAllCustomers = async (url) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res?.data?.data?.data);
      setCustomer(res?.data?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const url =
      "https://mr-manish-xcell-backend.vercel.app/api/v1/users";
    getAllCustomers(url);
  }, []);

  let newCustomer = [];
  if(customer?.length<=5) newCustomer = customer;
  else newCustomer = customer?.slice(-5);

  const [query, setQuery] = useState("");

  const searchData = !query ?  customer :
          customer.filter((item)=>{
            return (
              item?.middleName?.toLowerCase()?.includes(query?.toLowerCase()) ||
               item?.lastName?.toLowerCase()?.includes(query.toLowerCase())
            )
          })
  const newsearchData = !query ?  newCustomer :
          newCustomer.filter((item)=>{
            return (
              item?.middleName?.toLowerCase()?.includes(query?.toLowerCase()) ||
               item?.lastName?.toLowerCase()?.includes(query.toLowerCase())
            )
          })

          const [modalShow, setModalShow] = React.useState(false);

          function MyVerticallyCenteredModal(props) {
            const ud = localStorage.getItem("token");
            //const [branch, setBranch] = useState("");
            const [firstName, setfname] = useState("");
            const [lastName, setlname] = useState("");
            const [middleName, setmname] = useState("");
            const [phone, setPhone] = useState("");
            const [email, setEmail] = useState("");
            const [customerId, setcid] = useState("");
            const [dateOfBirth, setdob] = useState("");
            const [gender, setgender] = useState("");
            const [bloodGroup, setBg] = useState("");
            const [doctorName, setdname] = useState("");
            const [hospitalName, sethname] = useState("");
            const [maritalStatus, setMs] = useState("");
            const [father_spouseName, setFs] = useState("");
            const [relationship, setrel] = useState("");
            const [firstLineAddress, setfla] = useState("");
            const [secondLineAddress, setsla] = useState("");
            const [country, setCountry] = useState("");
            const [state, setState] = useState("");
            const [district, setDistrict] = useState("");
            const [pincode, setPincode] = useState("");
            //const dispatch = useDispatch();
            const urla = "https://mr-manish-xcell-backend.vercel.app/api/v1/add-customer";
            const handleClick = async (e)=>{
              e.preventDefault();
              try{
          
                const res = await axios.post(urla,
                  {firstName,lastName,middleName, phone, email,customerId, dateOfBirth, gender,
                    bloodGroup, doctorName, hospitalName, maritalStatus, father_spouseName,
                    relationship, firstLineAddress, secondLineAddress, country, state,
                    district, pincode   
                  } ,
                  {
                   headers :{
                    Authorization:`Bearer ${ud}`,
                   }
                  } 
                )
                console.log(res?.data);
                getAllCustomers();
               // getAllUsers();
              //  dispatch(GetBranches());
              }catch(err){
                console.log(err.message);
              }
            }
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
                    <label>First Name</label>
                    <input type="text" onChange={(e)=>setfname(e.target.value)} required/>
                    <label>Last Name</label>
                    <input type="text" onChange={(e)=>setlname(e.target.value)} required/>
                    <label>Middle Name</label>
                    <input type="text" onChange={(e)=>setmname(e.target.value)} required/>
                    <label>Phone</label>
                    <input type="text" onChange={(e)=>setPhone(e.target.value)} placeholder="9897...." required/>
                    <label>Email</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="example@gmail.com" required/>
                    <label>Customer Id</label>
                    <input type="text" onChange={(e)=>setcid(e.target.value)} placeholder="123456..." required/>
                    <label>DOB</label>
                    <input type="text" onChange={(e)=>setdob(e.target.value)} required/>
                    <label>Gender</label>
                    <input type="text" onChange={(e)=>setgender(e.target.value)} required/>
                    <label>Blood Group</label>
                    <input type="text" onChange={(e)=>setBg(e.target.value)} required/>
                    <label>Doctor Name</label>
                    <input type="text" onChange={(e)=>setdname(e.target.value)} required/>
                    <label>Hospital Name</label>
                    <input type="text" onChange={(e)=>sethname(e.target.value)} required/>
                    <label>Marrital Status</label>
                    <input type="text" onChange={(e)=>setMs(e.target.value)} required/>
                    <label>Father Spouse Name</label>
                    <input type="text" onChange={(e)=>setFs(e.target.value)} required/>
                    <label>Relationship</label>
                    <input type="text" onChange={(e)=>setrel(e.target.value)} required/>
                    <label>Address First Line</label>
                    <input type="text" onChange={(e)=>setfla(e.target.value)} required/>
                    <label>Address Second Line</label>
                    <input type="text" onChange={(e)=>setsla(e.target.value)} required/>
                    <label>Country</label>
                    <input type="text" onChange={(e)=>setCountry(e.target.value)} required/>
                    <label>State</label>
                    <input type="text" onChange={(e)=>setState(e.target.value)} required/>
                    <label>District</label>
                    <input type="text" onChange={(e)=>setDistrict(e.target.value)} required/>
                    <label>Pincode</label>
                    <input type="text" onChange={(e)=>setPincode(e.target.value)} required/>
                    <button type="submit"  >Add Customer</button>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
              </Modal>
            );
          }
          
        


  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Total Customer (100)</h1>
      </div>

      <div className={styles.inputBoxMainDiv}>
        <div className={styles.inputBox}>
          <AiOutlineSearch className={stylesfromDash.filterSectionIconSearch} />
          <input type="text" placeholder="Search by Name,Town,State etc" 
            onChange={(e)=>setQuery(e.target.value)}
          />
        </div>
        <AddCustomerModal
          openModal={addCustModal}
          HandleModal={HandleAddCustoModal}
        />
        <button onClick={()=>setModalShow(true)}>Add Customer</button>
      </div>

      <div className={styles.CustomerMain}>
        <p>Customer Detail's</p>
        <div className={styles.TabTitle}>
          <div
            onClick={() => setTab("all")}
            className={tab === "all" && styles.active}
          >
            All Customers
          </div>
          <div
            onClick={() => setTab("new")}
            className={tab === "new" && styles.active}
          >
            New({newCustomer?.length})
          </div>
        </div>
        <hr />
        <SingleCostomerInfoModal
          openModal={CustomerInfoModal}
          HandleModal={HandleModal}
        />
        <div className={styles.tableDiv}>          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>State</th>
                <th>District</th>
                <th>Pincode</th>
              </tr>
            </thead>

            <tbody>
              {tab === "all"
                // ? searchData?.length >0  
                ?
                  searchData?.map((ele)=>(
                    <>
                    <tr>
                      <td>{ele.middleName}</td>
                      <td>{ele.lastName}</td>

                      <td>{ele.firstLineAddress + ele.secondLineAddress}</td>
                      <td>{ele.state}</td>
                      <td>{ele.district}</td>
                      <td>{ele.pincode}</td>
                      {/*<td>
                        {" "}
                        <BsEyeFill
                          onClick={HandleModal}
                          cursor={"pointer"}
                          color="#C5161D"
                        />
                  </td>*/}
                    </tr>
                  </>
                  ))
                // :customer?.map((ele) => (
                //     <>
                //       <tr>
                //         <td>{ele.middleName}</td>
                //         <td>{ele.lastName}</td>

                //         <td>{ele.firstLineAddress + ele.secondLineAddress}</td>
                //         <td>{ele.state}</td>
                //         <td>{ele.district}</td>
                //         <td>{ele.pincode}</td>
                //         <td>
                //           {" "}
                //           <BsEyeFill
                //             onClick={HandleModal}
                //             cursor={"pointer"}
                //             color="#C5161D"
                //           />
                //         </td>
                //       </tr>
                //     </>
                //   ))
                // :
                :
                
                 newsearchData?.map((ele)=>(
                  <>
                  <tr>
                  <td>{ele.middleName}</td>
                    <td>{ele.lastName}</td>

                    <td>{ele.firstLineAddress + ele.secondLineAddress}</td>
                    <td>{ele.state}</td>
                    <td>{ele.district}</td>
                    <td>{ele.pincode}</td>
                    <td>
                      {" "}
                      {/*<BsEyeFill
                        onClick={HandleModal}
                        cursor={"pointer"}
                        color="#C5161D"
            />*/}
                    </td>
                  </tr>
                </>              
                 ))
              }
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
