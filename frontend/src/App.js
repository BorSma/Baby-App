import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { createBrowserHistory } from "history";
import Body from "./Components/Body";
import styled from "styled-components";
import { BabyAppContext } from "./Context/BabyAppContext";
import GlobalStyle from "./globalstyles";
import mountain from "./Assets/mountain.jpg";

require("dotenv").config();

const App = () => {
  const { userdata } = useContext(BabyAppContext);
  const historyInstance = createBrowserHistory();
  return (
    <>
      <Router history={historyInstance}>
        <GlobalStyle />
        {userdata.name !== null ? (
          <Wrapper>
            <Header />
            <Body />
            <Footer />
          </Wrapper>
        ) : (
          <Wrapper>
            <Header />
            <EmptyContainer>
              <IndexWrapper>
                <H1>Something is cooking...</H1>
                <TextWrapper>
                  <Text> Log in to find out what's cooking.</Text>
                  <Text> For access, please contact the parents.</Text>
                </TextWrapper>
              </IndexWrapper>
            </EmptyContainer>
            <Footer />
          </Wrapper>
        )}
      </Router>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url("${mountain}");
  background-size: cover;
  background-position: center;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const H1 = styled.h1`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #114b5f;
  color: #f3e9d2;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 700px;
`;

const Text = styled.p`
  padding: 10px;
  font-size: 20px;
  color: #114b5f;
`;

export default App;
