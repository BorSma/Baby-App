import React from "react";
import moment from "moment";

export const BabyAppContext = React.createContext(null);

export const ContextProvider = ({ children }) => {
  //const date = moment().format("h:mm a - MMM Do, YYYY").subtract(1, 'months'); // January 14th 2021, 6:40:30 pm
  // //const date = moment().format("h:mm a - MMM Do, YYYY"); // January 14th 2021, 6:40:30 pm
  // let a = moment();
  // let b = moment([2021, 10, 17]);
  // const date = moment(a).to(b).format("h:mm a - MMM Do, YYYY"); // "in a day"

  const [userdata, setUserdata] = React.useState({ name: null });
  const [token, setToken] = React.useState();
  const [accessToken, setAccessToken] = React.useState();
  const [mediaItems, setMediaItems] = React.useState([]);
  const [registryItems, setRegistryItems] = React.useState([]);
  const [nextPageToken, setNextPageToken] = React.useState("");

  React.useEffect(() => {
    console.log(userdata);
    if (userdata.name !== null) {
      localStorage.setItem("name", userdata.name);
      localStorage.setItem("email", userdata.email);
      localStorage.setItem("picture", userdata.picture);
    }
  }, [userdata]);

  React.useEffect(() => {
    console.log(mediaItems);
  }, [mediaItems]);

  React.useEffect(() => {
    console.log(registryItems);
  }, [registryItems]);

  React.useEffect(() => {
    console.log(`nextPageToken`,nextPageToken);
  }, [nextPageToken]);

  const likeFetch = async (url, options = {}) => {
    console.log(`nextPageToken`,nextPageToken);
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        //Authorization: token ? `Bearer ${token}` : undefined,
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        pageToken: nextPageToken ? `${nextPageToken}` : undefined
      },
    }).then((res) => res.json());
  };
  React.useEffect(() => {
    //console.log("Token", token);
    //console.log("Token", accessToken);
    //likeFetch('/me');
  }, [token, accessToken]);

  return (
    <BabyAppContext.Provider
      value={{
        userdata,
        mediaItems,
        registryItems,
        nextPageToken,
        setNextPageToken,
        setRegistryItems,
        setMediaItems,
        setUserdata,
        setToken,
        setAccessToken,
        fetch: likeFetch,
      }}
    >
      {children}
    </BabyAppContext.Provider>
  );
};
