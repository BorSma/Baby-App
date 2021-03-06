import styled from "styled-components";

const Photo = ({ link }) => {
  return (
    <>
      <ImageContainer>
        <Img alt={link} src={link} />
      </ImageContainer>
    </>
  );
};

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-style: solid;
  border-radius: 35px;
  border-width: 1px;
`;

const Img = styled.img`
  border-radius: 35px;
`;

export default Photo;
