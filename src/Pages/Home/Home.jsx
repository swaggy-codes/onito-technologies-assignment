import React from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import UserFormParent from "../UserDataForm/UserFormParent";
import TableComponent from "../../Components/TableComponent/TableComponent";

const Home = () => {
  const formDetails = useSelector((state) => state.formData);
  const userDataList = useSelector((state) => state.userDataList);

  const data = userDataList?.userDataList;
  const columns = [
    { title: "Name", data: "name" },
    { title: "Age", data: "age" },
    { title: "Gender", data: "sex" },
    { title: "Mobile", data: "mobile" },
    { title: "Govt ID Type", data: "idType" },
    { title: "Govt ID", data: "governmentId" },
    { title: "Address", data: "address" },
    { title: "State", data: "state" },
    { title: "City", data: "city" },
    { title: "Country", data: "country" },
    { title: "Pin Code", data: "pincode" },
  ];

  console.log(formDetails, "redux form details....", userDataList);

  return (
    <div>
      <h2 className='user-details-heading'>Add User Details</h2>
      <UserFormParent />
      <Container className='table-container'>
        <hr />
        <h2 className='user-details-heading'>Users Table</h2>
        <TableComponent data={data} columns={columns} />
      </Container>
    </div>
  );
};

export default Home;
