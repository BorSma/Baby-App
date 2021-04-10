/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BabyAppContext } from "../Context/BabyAppContext";
import Countdown from "react-countdown";
import { useGoogleMedia } from "../Context/MediaContext";
import Loader from "react-loader-spinner";
import {
  RiHome2Line,
  RiShoppingCartLine,
  RiInformationLine,
  RiStore2Line,
  RiQuestionAnswerLine,
} from "react-icons/ri";

import { ImWrench } from "react-icons/im";

import {
  IoMdPhotos,
  IoMdHome,
  IoMdInformationCircleOutline,
  IoMdList,
} from "react-icons/io";

const Header = () => {
  const {
    userdata,
    galleryPageNumber,
    setUserdata,
    setAccessToken,
    fetch,
    albumId,
    targetDate,
    fetchTargetDate,
  } = useContext(BabyAppContext);

  const { getAlbumId } = useGoogleMedia();

  useEffect(() => {
    if (userdata.name !== null && albumId === null) {
      console.log("Calling getAlbumId");
      getAlbumId();
    }
  }, [userdata]);

  const HandleLogin = async (googleData) => {
    console.log(`GoogleData`, googleData);
    setAccessToken(googleData.accessToken);
    const data = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
    });
    setUserdata(data.data);
  };

  const responseGoogle = (response) => {
    //console.log(`Here is the Google Profile Obj:${response}`);
  };

  return (
    <>
      <Wrapper>
        {userdata.name !== null ? (
          <>
            <Navbar>
              <Link to="/">
                <Icon>
                  <IoMdHome size="25" />
                </Icon>
                <LinkText>Home</LinkText>
              </Link>
              <Link to={`/BabyFact`}>
                <Icon>
                  <IoMdInformationCircleOutline size="25" />
                </Icon>
                <LinkText>Baby Facts</LinkText>
              </Link>
              <Link to={`/gallery/${galleryPageNumber}`}>
                <Icon>
                  {" "}
                  <IoMdPhotos size="25" />
                </Icon>
                <LinkText>Photo Album</LinkText>
              </Link>
              <Link to="/Registry">
                <Icon>
                  {" "}
                  <IoMdList size="25" />
                </Icon>
                <LinkText>Baby Registry</LinkText>
              </Link>
              {userdata.role === "admin" ? (
                <Link to="/Admin">
                  <Icon>
                    <ImWrench size="25" />
                  </Icon>
                  <LinkText>Admin</LinkText>
                </Link>
              ) : (
                <></>
              )}
            </Navbar>
            <CountdownContainer>
              {!targetDate ? (
                <Loader
                  type="Rings"
                  color="#114b5f"
                  height={50}
                  width={50}
                  timeout={10000} //3 secs
                />
              ) : (
                <Countdown
                  date={targetDate}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                      return <p>Baby's due date has passed!</p>;
                    } else {
                      return (
                        <Timer>
                          {/* {days}:{hours}:{minutes}:{seconds} until due date:{" "} */}
                          {days} Days Until Due Date!
                        </Timer>
                      );
                    }
                  }}
                />
              )}
            </CountdownContainer>
          </>
        ) : (
          <>
            <Navbar></Navbar>
            <CountdownContainer></CountdownContainer>
          </>
        )}
        <LoginLogoutButtons>
          {userdata.name !== null ? (
            <>
              <ProfileName>{userdata.name}</ProfileName>
              <ProfilePic src={userdata.picture}></ProfilePic>
            </>
          ) : (
            <></>
          )}
          {userdata.name === null ? (
            <GoogleLogin
              clientId="466950939046-1mrj17gi3oa5utbee5nhqmu3os833v23.apps.googleusercontent.com"
              buttonText="Login"
              scope="https://www.googleapis.com/auth/photoslibrary.readonly"
              onSuccess={HandleLogin}
              onFailure={responseGoogle}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
              disabled={userdata.name !== null}
            />
          ) : (
            <GoogleLogout
              clientId="466950939046-1mrj17gi3oa5utbee5nhqmu3os833v23.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={() => {
                setUserdata({ name: null });
                localStorage.clear();
              }}
              disabled={userdata.name === null}
            />
          )}
        </LoginLogoutButtons>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 50px;
  background-color: #c6dabf;
  border-width: 1px;
  border-style: solid;
  width: 99.8%;
`;

const LoginLogoutButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 35%;
  align-items: center;
  color: #114b5f;
`;
const Navbar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 35%;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1300px) {
    display: none;
  }
`;

const LinkText = styled.p`
  @media (max-width: 1300px) {
    display: none;
  }
`;

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  //flex-grow: 1;
  color: #114b5f;
  @media (max-width: 1500px) {
    display: none;
  }
`;

const Link = styled(NavLink)`
  padding: 8px;
  margin: 5px;
  min-width: 100px;
  max-width: 100px;
  text-decoration: none;
  background-color: #114b5f;
  outline: none;
  color: #f3e9d2;
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  text-align: center;
  &:hover {
    background-color: #f3e9d2; /* Green */
    color: #114b5f;
  }
  @media (max-width: 1300px) {
    margin: 2px;
    min-width: 30px;
    max-width: 30px;
  }
`;

const ProfilePic = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 45px;
  padding: 20px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const ProfileName = styled.p`
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Timer = styled.h3``;

export default Header;
