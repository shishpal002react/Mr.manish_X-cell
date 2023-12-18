import React, { useState, useEffect } from "react";
import { MainInfo } from "../Dashboard/MainInfo";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Roles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

export const RoleMainSection = () => {
  const [tab, setTab] = useState("all");
  const [all, setAll] = useState([]);
  const url =
    "https://mr-manish-xcell-backend.vercel.app/api/v1/admin";
  const getAllAdmins = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res?.data?.data);
      setAll(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getAllAdmins();
  }, []);

  const admin = [];
  const sub_admin = [];

  all?.map((item) => {
    if (item?.role == "Admin") {
      admin.push(item);
    } else if (
      item?.role === "Sub-Admin" ||
      item?.role === "Sub-admin" ||
      item?.role === "sub-admin"
    ) {
      sub_admin.push(item);
    }
  });

  const [query, setQuery] = useState("");
  const searchData = !query ? all :
                  all?.filter((item)=>{
                    return item?.lastName?.toLowerCase()?.includes(query?.toLowerCase()) 
                  })

  const adminsearchData = !query ? admin :
  admin?.filter((item)=>{
    return item?.lastName?.toLowerCase()?.includes(query?.toLowerCase()) 
  })
  const subadminsearchData = !query ? sub_admin :
  sub_admin?.filter((item)=>{
    return item?.lastName?.toLowerCase()?.includes(query?.toLowerCase()) 
  })


  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={styles.RoleMain}>
        <div className={styles.SearchBox}>
          <div>
            <AiOutlineSearch className={styles.SearchIcon} />
            <input type="text" placeholder="Search by order Id,Customer Id" 
              onChange={((e)=>setQuery(e.target.value))}
            />
          </div>
          <button>Search</button>
        </div>
        <div className={styles.TabTitle}>
          <div
            onClick={() => setTab("all")}
            className={tab === "all" && styles.active}
          >
            All({all?.length})
          </div>
          <div
            onClick={() => setTab("admin")}
            className={tab === "admin" && styles.active}
          >
            Admin({admin?.length})
          </div>
          <div
            onClick={() => setTab("subAdmin")}
            className={tab === "subAdmin" && styles.active}
          >
            Sub-Admin({sub_admin?.length})
          </div>
        </div>
        <hr />
        <div className={styles.tableDiv}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {tab === "all"
                ? 
                  searchData?.map((ele, i)=>(
                    <>
                      <tr>
                        <td>
                          <div>{ele.lastName}</div>
                        </td>
                        <td>{i + 1}</td>

                        <td>{ele.role}</td>
                      </tr>
                    </>                  
                  ))
                
                : tab === "admin"
                ? 
                  adminsearchData?.map((ele, i)=>(
                    <>
                    <tr>
                      <td>
                        <div>{ele.lastName}</div>
                      </td>
                      <td>{i + 1}</td>

                      <td>{ele.role}</td>
                    </tr>
                  </>                 
                  ))
                : 
                  
                   subadminsearchData?.map((ele,i)=>(
                    <>
                    <tr>
                      <td>
                        <div>{ele.lastName}</div>
                      </td>
                      <td>{i + 1}</td>

                      <td>{ele.role}</td>
                    </tr>
                  </>
                   ))
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
