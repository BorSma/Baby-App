import React, { useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BabyAppContext } from "../Context/BabyAppContext";
import Countdown from "react-countdown";

const Header = () => {
  const {
    userdata,
    setUserdata,
    setToken,
    setAccessToken,
    fetch,
    date,
  } = useContext(BabyAppContext);
  const HandleLogin = async (googleData) => {
    console.log(`GoogleData`, googleData);
    setToken(googleData.tokenId);
    setAccessToken(googleData.accessToken);
    const data = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
        //token: googleData.accessToken,
      }),
    });
    setUserdata(data);
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
              <Link to="/">Home</Link>
              <Link to="/Gallery">Gallery</Link>
              <Link to="/Registry">Registry</Link>
            </Navbar>
            <Countdown
              date={"2021-10-17T00:00:00"}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                  return <p>Baby's due date has passed!</p>;
                } else {
                  return (
                    <Timer>
                      Baby ETA is in: {days} Days, {hours} Hours,{" "}
                      {minutes} Minutes, {seconds} Seconds
                    </Timer>
                  );
                }
              }}
            />
            <p>{date}</p>
          </>
        ) : (
          <p> You are not logged in</p>
        )}
        <LoginLogoutButtons>
          {userdata.name !== null ? (
            <>
              <ProfileName>{userdata.name}</ProfileName>
              <ProfilePic src={userdata.picture}></ProfilePic>
            </>
          ) : (
            <p> You are not logged in</p>
          )}
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
          <GoogleLogout
            clientId="466950939046-1mrj17gi3oa5utbee5nhqmu3os833v23.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={() => {
              setUserdata({ name: null });
              localStorage.clear();
            }}
            disabled={userdata.name === null}
          />
        </LoginLogoutButtons>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  height: 50px;
`;
const LoginLogoutButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 3;
  align-items: center;
`;
const Navbar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 3;
`;

const Link = styled(NavLink)`
  padding: 20px;
  text-decoration: none;
  outline: none;
`;

const ProfilePic = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 45px;
  padding: 20px;
`;

const ProfileName = styled.p``;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;
const Timer = styled.h3`
`;

export default Header;
