import React from "react";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
//import { useRegistryItems } from "../../Context/RegistryContext";
import { BabyAppContext } from "../../Context/BabyAppContext";

const EditModal = ({ msg }, handleClose) => {
  //const { updateRegistryItem, fetchRegistryItems } = useRegistryItems();
  const { set_id, formData, setFormdata } = useContext(BabyAppContext);
  const [url, setUrl] = useState(`${msg.url}`);
  const [title, setTitle] = useState(`${msg.title}`);
  const [description, setDescription] = useState(`${msg.description}`);
  const [photo, setPhoto] = useState(`${msg.photo}`);
  const [price, setPrice] = useState(`${msg.price}`);
  const [vendor, setVendor] = useState(`${msg.vendor}`);


  useEffect(() => {
    setFormdata({
      url: url,
      description: description,
      title: title,
      photo: photo,
      vendor: vendor,
      price: price
    })
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const submitForm = (event) => {
    set_id({ _id: msg._id, action: "update" });
    //setStatus("refresh");
    handleClose();
    // updateRegistryItem();
    // fetchRegistryItems();
    event.preventDefault();
  };
  const onChangeURL = (event) => {
    setUrl(event.target.value);
    setFormdata({
      ...formData,
      url: event.target.value,
    });
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    setFormdata({
      ...formData,
      title: event.target.value,
    });
  };
  const onChangeDescription = (event) => {
    setDescription(event.target.value);
    setFormdata({
      ...formData,
      description: event.target.value,
    });
  };
  const onChangePhoto = (event) => {
    setPhoto(event.target.value);
    setFormdata({
      ...formData,
      photo: event.target.value,
    });
  };
  const onChangeVendor = (event) => {
    setVendor(event.target.value);
    setFormdata({
      ...formData,
      vendor: event.target.value,
    });
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
    setFormdata({
      ...formData,
      price: event.target.value,
    });
  };

  return (
    <StyledForm if="form" name="form" onSubmit={submitForm}>
      <ContentWrapper>
        <LabelWrapper>
          <Label>Title:</Label>
          <Label>Description:</Label>
          <Label>Product Page URL:</Label>
          <Label>Product Photo URL:</Label>
          <Label>Vendor:</Label>
          <Label>Price:</Label>
        </LabelWrapper>
        <InputWrapper>
          <Input type="text" onChange={onChangeTitle} value={title} />
          <Input
            type="text"
            onChange={onChangeDescription}
            value={description}
          />
          <Input type="text" onChange={onChangeURL} value={url} />
          <Input type="text" onChange={onChangePhoto} value={photo} />
          <Input type="text" onChange={onChangeVendor} value={vendor} />
          <Input type="text" onChange={onChangePrice} value={price} />
        </InputWrapper>
      </ContentWrapper>
      <Submit type="submit" value="Submit" />
    </StyledForm>)
};



const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Input = styled.input`
  width: 400px;
  height: 30px;
  border-radius: 25px;
  border-style: solid;
  outline: none;
  margin: 10px;
  padding: 2px;
  @media (max-width: 500px) {
    width: 75%;
  }
`;

const Label = styled.p`
  margin: 10px;
  color: #114b5f;
`;

const Submit = styled.input`
  width: 100px;
  margin: 20px;
  background-color: #114b5f; /* Green */
  color: #f3e9d2;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  border-color: #f6f4d2;
  min-width: 150px;
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

export default EditModal;
