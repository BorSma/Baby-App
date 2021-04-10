import styled from "styled-components";

const BabyFact = ({ babyFact }) => {

  return (
    <>
      <Wrapper>
        <Subheader>
          Mom is in {babyFact.data.Title}. Trimester: {babyFact.data.Trimester}
        </Subheader>
        <ContentsWrapper>
          <TextWrapper>
            <Subheader>Here is what is happening with the baby:</Subheader>
            <Text>{babyFact.data.Description}</Text>
          </TextWrapper>
        </ContentsWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 50vh;
  color: #114b5f;
`;

const ContentsWrapper = styled.div`
  display: flex;
`;

const Subheader = styled.h2`
  padding: 10px;
  color: #114b5f;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 700px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Text = styled.p`
  padding: 10px;
  font-size: 20px;
`;

export default BabyFact;
