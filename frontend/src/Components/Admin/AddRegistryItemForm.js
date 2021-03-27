import { useState, useContext } from "react";
import styled from "styled-components";
import { useRegistryItems } from "../../Context/RegistryContext";
import { BabyAppContext } from "../../Context/BabyAppContext";
const AddRegistryItemForm = () => {
  const { addRegistryItem } = useRegistryItems();
  const { formData, setFormdata } = useContext(BabyAppContext);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const submitForm = (event) => {
    //event.preventDefault();
    addRegistryItem();
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
        <h3>Submit Registry Item:</h3>
        <StyledForm if="form" name="form" onSubmit={submitForm}>
          <ContentWrapper>
            <LabelWrapper>
              <Label>URL:</Label>
              <Label>Title:</Label>
              <Label>Description:</Label>
              <Label>Photo:</Label>
            </LabelWrapper>
            <InputWrapper>
              <Input type="text" onChange={onChangeURL} value={url} />
              <Input type="text" onChange={onChangeTitle} value={title} />
              <Input
                type="text"
                onChange={onChangeDescription}
                value={description}
              />
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
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin: 20px;
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
`;

const Label = styled.p`
  margin: 10px;
`;

const Submit = styled.input`
  width: 100px;
  height: 30px;
  outline: none;
  margin: 20px;
`;

export default AddRegistryItemForm;
