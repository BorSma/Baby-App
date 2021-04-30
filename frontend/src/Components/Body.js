import Intro from "./Intro/index";
import Registry from "./Registry/";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Gallery from "./Gallery/";
import Admin from "./Admin";
import BabyFact from "./BabyFact/";
import ErrorPage from "./ErrorPage/"

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
          <Route exact path="/babyfact">
            <BabyFact />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
`;

export default Body;
