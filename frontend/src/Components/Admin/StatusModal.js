import React from "react";
import styled from "styled-components";

const StatusModal = ({ msg }, handleClose) => {

  return (
    <ContentWrapper>
      <LabelWrapper>
        <Label>Success!</Label>
        <Label>Item has been succesfully added!</Label>
      </LabelWrapper>
    </ContentWrapper>)
};

const ContentWrapper = styled.div`
  display: flex;
  margin: 20px;
  @media (max-width: 1300px) {
    margin: 3px;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Label = styled.p`
  margin: 10px;
  color: #114b5f;
`;

export default StatusModal;
