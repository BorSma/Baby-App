import styled from "styled-components";

const GarbageModal = ({ deleteRegistryEntry, handleClose }) => {

  return (
    <ContentWrapper>
      <Label>Are you sure you want to delete this item and remove it from the list?</Label>
      <LabelWrapper>
        <Button onClick={deleteRegistryEntry} title="Delete">Delete</Button>
        <Button onClick={() => { handleClose() }} title="Cancel">Cancel</Button>
      </LabelWrapper>
    </ContentWrapper >)
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  @media (max-width: 1300px) {
    margin: 3px;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.p`
  margin: 10px;
  color: #114b5f;
`;

const Button = styled.button`
  width: 100px;
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


export default GarbageModal;
