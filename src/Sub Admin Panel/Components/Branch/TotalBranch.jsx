import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import stylesfromDash from "../../Styles/DashBoard.module.css";
import styles from "../../Styles/Branch.module.css";
import { MainInfo } from "../Dashboard/MainInfo";
import { BranchList } from "./BranchList";
import { BranchLogin } from "./BranchLogin";
export const TotalBranch = () => {
  const [show, setShow] = useState(false);
  const data = [
    {
      branch_name: "Branch name",
      branch_add:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit.-42222",
    },
    {
      branch_name: "Branch name",
      branch_add:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit.-42222",
    },
    {
      branch_name: "Branch name",
      branch_add:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit.-42222",
    },
  ];
  const HandleBranchLoginModal = () => {
    setShow(!show);
  };
  return (
    <div className={stylesfromDash.mainSection}>
      <MainInfo />
      <div className={stylesfromDash.mainOrderSection}>
        <h1 className={stylesfromDash.Title}>Total Branch (10)</h1>
      </div>
      <div className={styles.inputBoxMainDiv}>
        <div className={styles.inputBox}>
          <AiOutlineSearch className={stylesfromDash.filterSectionIconSearch} />
          <input type="text" placeholder="Search by branch name" />
        </div>
        <button>Add Branch</button>
      </div>
      <div className={styles.branchListDiv}>
        <BranchLogin
          OpenModal={show}
          HandleBranchLoginModal={HandleBranchLoginModal}
        />
        {data?.map((ele) => (
          <>
            <BranchList
              data={ele}
              HandleBranchLoginModal={HandleBranchLoginModal}
            />
          </>
        ))}
      </div>
    </div>
  );
};
