import styled from "styled-components";
import AddRegistryItemForm from "./AddRegistryItemForm";
import ChangeTargetDateForm from "./ChangeTargetDateForm";

const Admin = () => {
  return (
    <>
      <Wrapper>
        <p>This is the admin Page</p>
        <AddRegistryItemForm></AddRegistryItemForm>
        <ChangeTargetDateForm></ChangeTargetDateForm>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

export default Admin;
