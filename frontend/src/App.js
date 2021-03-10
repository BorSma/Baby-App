import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { createBrowserHistory } from "history";
import Body from "./Components/Body";
import styled from "styled-components";
import { BabyAppContext } from "./Context/BabyAppContext";

require("dotenv").config();

const App = () => {
  const { username } = useContext(BabyAppContext);
  const historyInstance = createBrowserHistory();
  return (
    <>
      <Router history={historyInstance}>
        <Wrapper>
          <Header />
          {username.id !== null ? <Body /> : <p> You're not logged in!</p>}
          <Footer />
        </Wrapper>
      </Router>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
