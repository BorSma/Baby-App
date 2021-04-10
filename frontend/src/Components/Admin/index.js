import styled from "styled-components";
import React from "react";
import AddRegistryItemForm from "./AddRegistryItemForm";
import ChangeTargetDateForm from "./ChangeTargetDateForm";
import mountain from "../../Assets/mountain.jpg";

const Admin = () => {
  return (
    <>
      <Wrapper>
        <AdminWrapper>
          <Header>Administration Console</Header>
          <FormWrapper>
            <AddRegistryItemForm></AddRegistryItemForm>
            <ChangeTargetDateForm></ChangeTargetDateForm>
          </FormWrapper>
        </AdminWrapper>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("${mountain}");
  background-size: cover;
  background-position: center;
  min-height: 90vh;
`;

const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  background-color: rgb(198, 218, 191, 0.8);
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
`;

const Header = styled.h1`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #114b5f;
  color: #f3e9d2;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1300px) {
    flex-direction: column;
  }
`;

export default Admin;
