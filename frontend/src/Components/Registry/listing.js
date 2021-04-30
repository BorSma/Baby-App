import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { BabyAppContext } from "../../Context/BabyAppContext";
import {
  IoMdTrash, IoMdCreate, IoMdEye, IoMdGift
} from "react-icons/io";
import Logo from "./logo";
import EditModal from "./EditModal";
import Dialog from "@material-ui/core/Dialog";


const Listing = ({ msg }) => {
  const { set_id, userdata, status, setStatus } = useContext(BabyAppContext);

  const [openEditModal, setOpenEditModal] = React.useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };



  useEffect(() => {
    setStatus("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const deleteRegistryEntry = () => {
    set_id({ _id: msg._id, action: "delete" });
    setStatus("refresh");
  };

  const buyRegistryEntry = () => {
    set_id({ _id: msg._id, action: "buy" });
    setStatus("refresh");
  };

  const unbuyRegistryEntry = () => {
    set_id({ _id: msg._id, action: "unbuy" });
    setStatus("refresh");
  };

  return (
    <>
      <Wrapper>
        <Dialog
          open={openEditModal}
          onClose={handleCloseEditModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <EditModal msg={msg} handleClose></EditModal>

        </Dialog>
        <ItemLink href={msg.url}>
          <Title>{msg.title}</Title>
        </ItemLink>

        <PhotoWrapper>
          <ItemLink href={msg.url}>
            <Photo alt={msg.title} src={msg.photo}></Photo>
          </ItemLink>
        </PhotoWrapper>
        <ItemLink href={msg.url}>
          <Logo vendor={msg.vendor}></Logo></ItemLink>
        <Description>{msg.description}</Description>
        <Text>${msg.price}</Text>
        {userdata.role === "admin" ? (
          <>
            <Description>Bought: {msg.bought}</Description>
            <Description>Buyer: {msg.buyer}</Description>

          </>
        ) : (
          <></>
        )}
        <ButtonContainer>
          {userdata.role === "admin" ? (
            <>
              <Button onClick={handleOpenEditModal} title="Edit Registry Item"><IoMdCreate size="25" /></Button>
              <Button onClick={deleteRegistryEntry} title="Delete Registry Item"><IoMdTrash size="25" /></Button>
              <Button onClick={buyRegistryEntry}
                disabled={msg.bought === "true"} title="Mark as Bought"><IoMdGift size="25" /></Button>
              <Button onClick={unbuyRegistryEntry}
                disabled={msg.bought === "false"} title="Mark Visible to Guests"><IoMdEye size="25" /></Button>
            </>
          ) : (
            <>
              <Button onClick={buyRegistryEntry}
                disabled={msg.bought === "true"} title="Mark as Bought"><IoMdGift size="25" /></Button>
            </>
          )}
        </ButtonContainer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: center;
  background-color: #f0f4ef;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  width: 550px;
  @media (max-width: 500px) {
    width: 100%;
    padding: 2px;
    margin: 2px;
  }
`;

const Title = styled.h3`
  margin: 10px;
  color: #114b5f;
`;

const Description = styled.p`
  margin: 10px;
  color: #114b5f;
`;

const Text = styled.p`
  margin: 3px;
  color: #114b5f;
  font-size: 20px;
`;

const PhotoWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const Photo = styled.img`
  width: 200px;
  height: 200px;
  margin: 10px;
  border-width: 1px;
  border-style: solid;
  border-radius: 100%;
`;


const ItemLink = styled.a`
  text-decoration: none;
  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  width: 50px;
  margin: 20px;
  background-color: #114b5f; /* Green */
  color: #f3e9d2;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  border-color: #f6f4d2;
  min-width: 60px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #f3e9d2; /* Green */
    color: #114b5f;
  }
  &:disabled {
    background-color: #114b5f; /* Green */
    color: #f3e9d2;
    cursor: auto;
  }
`;

export default Listing;
