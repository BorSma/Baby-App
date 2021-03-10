import React, { useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BabyAppContext } from "../Context/BabyAppContext";

const Header = () => {
  const { username, setUsername } = useContext(BabyAppContext);
  const HandleLogin = async (googleData) => {
    const res = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUsername(data);
  };
  const responseGoogle = (response) => {
    console.log(`Here is the Google Profile Obj:${response}`);
  };
  return (
    <>
      <Wrapper>
        <Navbar>
          <Link to="/">Home</Link>
          <Link to="/Gallery">Gallery</Link>
          <Link to="/Registry">Registry</Link>
        </Navbar>
        <LoginLogoutButtons>
          {username.id !== null ? (
            <>
              <ProfileName>{username.name}</ProfileName>
              <ProfilePic src={username.picture}></ProfilePic>
            </>
          ) : (
            <p> You are not logged in</p>
          )}
          <GoogleLogin
            clientId="466950939046-1mrj17gi3oa5utbee5nhqmu3os833v23.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={HandleLogin}
            onFailure={responseGoogle}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
            disabled={username.id !== null}
          />
          <GoogleLogout
            clientId="466950939046-1mrj17gi3oa5utbee5nhqmu3os833v23.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={() => {
              setUsername({ id: null });
            }}
            disabled={username.id === null}
          />
        </LoginLogoutButtons>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 50px;
`;
const LoginLogoutButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  align-items: center;
`;
const Navbar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 4;
`;

const Link = styled(NavLink)`
  padding: 20px;
`;

const ProfilePic = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 45px;
  padding: 20px;
`;

const ProfileName = styled.p``;

export default Header;
