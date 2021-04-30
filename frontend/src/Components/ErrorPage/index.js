import styled from "styled-components";
import mountain from "../../Assets/mountain.jpg";

const ErrorPage = () => {

  return (
    <Wrapper>
      <IndexWrapper>
        <Header>Error, where'd the baby go?</Header>
      </IndexWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  background-image: url("${mountain}");
  background-size: cover;
  background-repeat: no-repeat;
`;

const IndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  background-color: rgb(198, 218, 191, 0.8);
  justify-content: flex-start;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
`;

const Header = styled.h1`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #114b5f;
  color: #f3e9d2;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
`;


export default ErrorPage;
