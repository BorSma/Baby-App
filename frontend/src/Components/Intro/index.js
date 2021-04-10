import { useContext } from "react";
import styled from "styled-components";
import { useBabyFacts } from "../../Context/BabyFactsContext";
import Loader from "react-loader-spinner";
import { BabyAppContext } from "../../Context/BabyAppContext";
import mountain from "../../Assets/mountain.jpg";
import banya from "../../Assets/banya.JPG";

const Intro = () => {
  const { targetDate } = useContext(BabyAppContext);
  const { babyFact, loading } = useBabyFacts();

  console.log({ babyFact, loading });

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
          <PhotoContainer>
            <PhotoTextNormal>
              A new addition to our family will arrive on:
            </PhotoTextNormal>
            <Photo alt="banya" src={banya}></Photo>
            <PhotoHeader>{targetDate}</PhotoHeader>
          </PhotoContainer>
          <TextContainer>
            <Text>We are over the moon!</Text>
            <Text>We are vibrating with joy!</Text>
            <Text>
              We are biting our nails because we have no idea what we are
              doing...
            </Text>
            <Text>
              But we would like to share our journey with you as we welcome our
              baby aka "Nugget".
            </Text>
            <Text>
              Check out the baby facts and the photo album. We will add stuff
              here as time goes on... If you would like to support us check out
              our baby registry.
            </Text>
          </TextContainer>
        </IndexWrapper>
      </Wrapper>
    </>
  );
};

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

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #114b5f;
  position: relative;
  width: 445px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #114b5f;
  padding: 20px;
  position: relative;
  width: 445px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const PhotoTextNormal = styled.p`
  font-size: 25px;
  font-weight: bold;
  position: absolute;
  color: #114b5f;
  left: 50%; /* horizontal alignment */
  top: 20%; /* vertical alignment */
  transform: translate(-50%, -65%); /* precise centering; see link below */
  text-align: center;
  font-style: italic;
  @media (max-width: 500px) {
    position: relative;
    transform: none;
    left: 0%;
    top: 0%;
  }
`;

const Text = styled.p`
  text-align: left;
  padding: 10px;
  font-size: 20px;
  font-style: italic;
`;

const Photo = styled.img`
  width: 400px;
  height: 400px;
  margin: 20px;
  border-width: 1px;
  border-style: solid;
  border-radius: 100%;

  @media (max-width: 500px) {
    width: 250px;
    height: 250px;
    margin: 5px;
  }
`;

const PhotoHeader = styled.h1`
  padding: 20px;
  background-color: #114b5f;
  color: #f3e9d2;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  @media (max-width: 500px) {
    padding: 5px;
    text-align: center;
    font-size: 35px;
  }
`;

export default Intro;
