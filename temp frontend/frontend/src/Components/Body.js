import Intro from "./Intro";
import Registry from "./Registry";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

// random comment some change
const Body = () => {
  return (
    <>
      {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Intro />
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
