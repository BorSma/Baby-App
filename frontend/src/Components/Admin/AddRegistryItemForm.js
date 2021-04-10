import { useState, useContext } from "react";
import styled from "styled-components";
import { useRegistryItems } from "../../Context/RegistryContext";
import { BabyAppContext } from "../../Context/BabyAppContext";

const AddRegistryItemForm = () => {
  const { addRegistryItem, fetchRegistryItems } = useRegistryItems();
  const { formData, setFormdata } = useContext(BabyAppContext);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const submitForm = (event) => {
    addRegistryItem();
    fetchRegistryItems();
  };
  const onChangeURL = (event) => {
    setUrl(event.target.value);
    setFormdata({
      ...formData,
      url: url,
    });
  };
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    setFormdata({
      ...formData,
      title: title,
    });
  };
  const onChangeDescription = (event) => {
    setDescription(event.target.value);
    setFormdata({
      ...formData,
      description: description,
    });
  };
  const onChangePhoto = (event) => {
    setPhoto(event.target.value);
    setFormdata({
      ...formData,
      photo: photo,
    });
  };
  return (
    <>
      <Wrapper>
        <Header>Submit Registry Item:</Header>
        <StyledForm if="form" name="form" onSubmit={submitForm}>
          <ContentWrapper>
            <LabelWrapper>
              <Label>Title:</Label>
              <Label>Description:</Label>
              <Label>Product Page URL:</Label>
              <Label>Product Photo URL:</Label>
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
            </InputWrapper>
          </ContentWrapper>
          <Submit type="submit" value="Submit" />
        </StyledForm>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin: 20px;
  margin-top: 40px;
  @media (max-width: 1300px) {
    margin: 3px;
  }
`;

const Header = styled.h2`
  margin-top: 20px;
  color: #114b5f;
`;

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

export default AddRegistryItemForm;
