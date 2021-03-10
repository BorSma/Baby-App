import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { createBrowserHistory } from "history";
import Body from "./Components/Body";
import styled from "styled-components";

require("dotenv").config();

// random comment some change
const App = () => {
  const historyInstance = createBrowserHistory();
  return (
    <>
      <Router history={historyInstance}>
        <Wrapper>
          <Header />
          <Body />
          <Footer />
        </Wrapper>
      </Router>
    </>
  );
};


const Wrapper = styled.div``;

export default App;
