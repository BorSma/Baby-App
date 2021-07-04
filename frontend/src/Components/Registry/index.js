/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useRegistryItems } from "../../Context/RegistryContext";
import Listing from "./listing";
import Loader from "react-loader-spinner";
import { BabyAppContext } from "../../Context/BabyAppContext";
import mountain from "../../Assets/mountain.jpg";
import { Link } from "react-router-dom";
import AddModal from "./AddModal";
import Dialog from "@material-ui/core/Dialog";
import { IoMdAddCircleOutline } from "react-icons/io";

const Registry = () => {
  const { registryItems, fetchRegistryItems } = useRegistryItems();
  const { userdata, status, setStatus } = useContext(BabyAppContext);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    fetchRegistryItems();
    setStatus("idle");
    // console.log(registryItems);
  }, []);

  useEffect(() => {
    fetchRegistryItems();
  }, [status]);

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  if (registryItems.hasOwnProperty("status")) {
    if (registryItems.status === 201 && userdata.role === "admin") {
      return (
        <Wrapper>
          <Dialog
            open={openAddModal}
            onClose={handleCloseAddModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <AddModal handleClose={handleCloseAddModal}></AddModal>

          </Dialog>
          <RegistryWrapper>
            <Header>Registry</Header>
            <Text>
              If you are interested in gifting us baby items we made a baby registry on <Link style={{ textDecoration: 'none', color: '#114b5f' }} to="https://www.babylist.com/baby-anya-marion">BabyList</Link>
              .
              We will happily accept (and actually prefer) pre-loved baby items.
              As far as delivery goes, feel free to reach out and we can arrange a time to meet or, if you prefer,
              you can send gifts directly to our home. Thank you!
            </Text><AddItemWrapper>
              <Title>Add Registry Item</Title>
              <Button onClick={handleOpenAddModal} title="Add Registry Item"><IoMdAddCircleOutline size="25" />
              </Button>
            </AddItemWrapper>
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
              If you are interested in gifting us baby items we made a baby registry on <Link style={{ textDecoration: 'none', color: '#114b5f' }} to="https://www.babylist.com/baby-anya-marion">BabyList</Link>
              .
              We will happily accept (and actually prefer) pre-loved baby items.
              As far as delivery goes, feel free to reach out and we can arrange a time to meet or, if you prefer,
              you can send gifts directly to our home. Thank you!
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

const AddItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: center;
  background-color: #f0f4ef;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  width: 550px;
  @media (max-width: 500px) {
    width: 100%;
    padding: 2px;
    margin: 2px;
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

const Title = styled.h3`
  margin: 10px;
  color: #114b5f;
`;

const Text = styled.p`
  text-align: left;
  padding: 10px;
  font-size: 20px;
  color: #114b5f;
`;

const Button = styled.button`
  width: 50px;
  margin: 20px;
  background-color: #114b5f; /* Green */
  color: #f3e9d2;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  border-color: #f6f4d2;
  min-width: 60px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #f3e9d2; /* Green */
    color: #114b5f;
  }
  &:disabled {
    background-color: #114b5f; /* Green */
    color: #f3e9d2;
    cursor: auto;
  }
`;

export default Registry;
