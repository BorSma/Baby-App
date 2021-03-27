import React, { useContext } from "react";
import styled from "styled-components";
import { useRegistryItems } from "../../Context/RegistryContext";
import { BabyAppContext } from "../../Context/BabyAppContext";

const Listing = ({ msg }) => {
  const { deleteRegistryItem } = useRegistryItems();
  const { set_id } = useContext(BabyAppContext);
  const deleteRegistryEntry = () => {
    set_id(msg._id);
    deleteRegistryItem();
  };
  return (
    <>
      <Wrapper>
        <ImgWrapper>
          <img alt={msg.title} src={msg.photo}></img>
        </ImgWrapper>

        <ContentsWrapper>
          <ItemLink href={msg.url}>
            <h3>{msg.title}</h3>
          </ItemLink>
          <p>{msg.description}</p>
          <button onClick={deleteRegistryEntry}>Delete</button>
        </ContentsWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.ul`
  display: flex;
  list-style: none;
  justify-content: flex-start;
  align-items: center;
  margin: 20px;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding-right: 40px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
`;

const ItemLink = styled.a`
  text-decoration: none;
  outline: none;
`;

export default Listing;
