import Intro from "./Intro";
import Registry from "./Registry/";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Gallery from "./Gallery/";

const Body = () => {
  return (
    <>
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Intro />
          </Route>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route exact path="/registry">
            <Registry />
          </Route>
        </Switch>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

export default Body;
