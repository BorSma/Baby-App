import BabyFact from "./babyfact";
import styled from "styled-components";
import { useBabyFacts } from "../../Context/BabyFactsContext";
import Loader from "react-loader-spinner";
import mountain from "../../Assets/mountain.jpg";


const Intro = () => {
  const { babyFact, loading } = useBabyFacts();

  if (loading) {
    return (
      <Wrapper>
        <LoaderWrapper>
          <Loader
            type="Rings"
            color="#114b5f"
            height={100}
            width={100}
            timeout={10000} //3 secs
          />
        </LoaderWrapper>
      </Wrapper>
    );
  }
  if (babyFact.status !== 200) {
    return (
      <Wrapper>
        <IndexWrapper>
          <Header>Error, please come back when we are open</Header>
        </IndexWrapper>
      </Wrapper>
    );
  }

  return (
    <>
      <Wrapper>
        <IndexWrapper>
          <Header>Baby Facts</Header>
          <BabyFact babyFact={babyFact}></BabyFact>
        </IndexWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("${mountain}");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 90vh;
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

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export default Intro;
