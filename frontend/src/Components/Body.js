import Intro from "./Intro/index";
import Registry from "./Registry/";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Gallery from "./Gallery/";
import Admin from "./Admin";

const Body = () => {
  return (
    <>
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Intro />
          </Route>
          <Route exact path={["/gallery", "/gallery/:pageNumber"]}>
            <Gallery />
          </Route>
          <Route exact path="/registry">
            <Registry />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
        </Switch>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;

export default Body;
