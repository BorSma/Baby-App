/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import styled from "styled-components";
import { useRegistryItems } from "../../Context/RegistryContext";
import Listing from "./listing";
import Loader from "react-loader-spinner";
import { BabyAppContext } from "../../Context/BabyAppContext";
import mountain from "../../Assets/mountain.jpg";

const Registry = () => {
  const { registryItems, fetchRegistryItems } = useRegistryItems();
  const { userdata, status, setStatus } = useContext(BabyAppContext);

  useEffect(() => {
    fetchRegistryItems();
    setStatus("idle");
    console.log(registryItems);
  }, []);

  useEffect(() => {
    fetchRegistryItems();
  }, [status]);

  if (registryItems.hasOwnProperty("status")) {
    if (registryItems.status === 201 && userdata.role === "admin") {
      return (
        <Wrapper>
          <RegistryWrapper>
            <Header>Registry</Header>
            <Text>
              We'd be happy to take pre-loved baby items. If you would like to
              support us, you can check out our registry below. Please click the
              "Bought" button for the item once purchased to remove it from the
              list. 
            </Text>
            <RegistryItemsContainer>
              {registryItems.registryItems.map((registryItem, i) => {
                return (
                  <li key={i}>
                    <Listing key={i} msg={registryItem} />
                  </li>
                );
              })}
            </RegistryItemsContainer>
          </RegistryWrapper>
        </Wrapper>
      );
    }
    if (registryItems.status === 201) {
      return (
        <Wrapper>
          <RegistryWrapper>
            <Header>Registry</Header>
            <Text>
              We are happy to take pre-loved baby items. Another way to support
              us is choosing an item from our wishlist. To help us avoid
              duplicates, please click the "Bought" button to take it off the
              list. (Hint: The photo and title links to a store where you can
              buy the item).
            </Text>
            <RegistryItemsContainer>
              {registryItems.registryItems.map((registryItem, i) => {
                if (registryItem.bought === "false")
                  return (
                    <li key={i}>
                      <Listing key={i} msg={registryItem} />
                    </li>
                  );
                else return <></>;
              })}
            </RegistryItemsContainer>
          </RegistryWrapper>
        </Wrapper>
      );
    } else if (registryItems.status === 404) {
      return (
        <Wrapper>
          <RegistryWrapper>
            <Header>Registry</Header>
            <Header>Error, please come back when we are open</Header>
          </RegistryWrapper>
        </Wrapper>
      );
    }
  } else {
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
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  min-height: 100vh;
  background-image: url("${mountain}");
  background-size: cover;
  background-position: center;
`;

const RegistryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  background-color: rgb(198, 218, 191, 0.8);
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  width: 600px;
  @media (max-width: 500px) {
    width: 90%;
    margin: 2px;
    padding: 2px;
  }
`;

const RegistryItemsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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

const Text = styled.p`
  text-align: left;
  padding: 10px;
  font-size: 20px;
  color: #114b5f;
`;

export default Registry;
