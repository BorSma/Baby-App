import GoogleLogin from "react-google-login";
import GoogleLogout from "react-google-login";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const handleLogin = (googleData) => {
  console.log(`googleData:`,googleData);
  const res = await fetch("/api/v1/auth/google", {
    method: "POST",
    body: JSON.stringify({
      token: googleData.tokenId,
      //token: googleData.accessToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  //console.log(data);
};

const Header = () => {
  
  const responseGoogle = (response) => {
    console.log(`Here is the Google Profile Obj:${response}`);
  };

  return (
    <>
      {/* <GoogleLogin
        clientId="466950939046-1mrj17gi3oa5utbee5nhqmu3os833v23.apps.googleusercontent.com"
        buttonText="Login"
        scope = 'https://www.googleapis.com/auth/photoslibrary.readonly'
        onSuccess={handleLogin}
        onFailure={responseGoogle}
        isSignedIn={false}
        cookiePolicy={"single_host_origin"}
      />
      <GoogleLogout
        clientId="466950939046-1mrj17gi3oa5utbee5nhqmu3os833v23.apps.googleusercontent.com"
        buttonText="Logout"
        //onLogoutSuccess={logout}
      /> */}
      <Link to="/Registry">Registr</Link>
      <Link to="/">Home</Link>
    </>
  );
};

const Link = styled(NavLink)``;

export default Header;
