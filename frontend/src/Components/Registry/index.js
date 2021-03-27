import { useEffect } from "react";
import styled from "styled-components";
import { useRegistryItems } from "../../Context/RegistryContext";
import Listing from "./listing";

const Registry = () => {
  const { registryItems, fetchRegistryItems } = useRegistryItems();
  useEffect(() => {
    if (registryItems.length === 0) fetchRegistryItems();
  }, []);

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
