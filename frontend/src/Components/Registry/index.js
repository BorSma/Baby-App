import React, { useContext } from "react";
import styled from "styled-components";

import { BabyAppContext } from "../../Context/BabyAppContext";
import Listing from "./listing";

const Registry = () => {
  const { fetch, setRegistryItems, registryItems } = useContext(BabyAppContext);

  React.useEffect(() => {
    loadRegistry();
  }, []);

  const loadRegistry = async () => {
    const data = await fetch("/populateregistry", {
      method: "GET",
    });
    setRegistryItems(data.registryItems);
  };
  return (
    <>
      <Title>This is the Registry!</Title>
      {registryItems.length !== 0 ? (
        <>
          <Wrapper>
            {registryItems.map((registryItem, i) => {
              return (
                <li>
                  <Listing msg={registryItem} key={registryItem._id} />
                </li>
              );
            })}
          </Wrapper>
        </>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  flex-wrap: wrap;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
`;

export default Registry;
