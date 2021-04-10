import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <Text>© 2021, Banya, Inc. or its affiliates</Text>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 50px;
  background-color: #c6dabf;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  text-align: left;
  padding: 10px;
  font-size: 20px;
  color: #114b5f;
`;

export default Footer;
