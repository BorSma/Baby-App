import { useContext, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BabyAppContext } from "../Context/BabyAppContext";
import Countdown from "react-countdown";

const Header = () => {
  const {
    userdata,
    galleryPageNumber,
    setUserdata,
    setAccessToken,
    fetch,
    targetDate,
    fetchTargetDate,
  } = useContext(BabyAppContext);

  const HandleLogin = async (googleData) => {
    console.log(`GoogleData`, googleData);
    setAccessToken(googleData.accessToken);
    const data = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
    });
    setUserdata(data);
  };

  const responseGoogle = (response) => {
    //console.log(`Here is the Google Profile Obj:${response}`);
  };

  useEffect(() => {
    if (!targetDate) fetchTargetDate();
  }, []);

  if (!targetDate) return <p>Loading</p>;

  return (
    <>
      <Wrapper>
        {userdata.name !== null ? (
          <>
            <Navbar>
              <Link to="/">Home</Link>
              <Link to={`/gallery/${galleryPageNumber}`}>Gallery</Link>
              <Link to="/Registry">Registry</Link>
              <Link to="/Admin">Admin</Link>
            </Navbar>
            <CountdownContainer>
              <Countdown
                date={targetDate}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  if (completed) {
                    return <p>Baby's due date has passed!</p>;
                  } else {
                    return (
                      <Timer>
                        {days} Days, {hours} Hours, {minutes} Minutes, {seconds}{" "}
                        Seconds left until: {targetDate}
                      </Timer>
                    );
                  }
                }}
              />
            </CountdownContainer>
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

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DueDate = styled.p`
  margin: 0px;
  padding: 0px;
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
const Timer = styled.h3``;

export default Header;
