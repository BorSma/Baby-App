import React from "react";
// import moment from "moment";

export const BabyAppContext = React.createContext(null);

export const ContextProvider = ({ children }) => {
  // const date = moment().format("h:mm a - MMM Do, YYYY"); // January 14th 2021, 6:40:30 pm

  const [username, setUsername] = React.useState({ id: null });

  React.useEffect(() => {
    console.log(`username Info:`,username);
  }, [username]);

  return (
    <BabyAppContext.Provider
      value={{
        username,
        setUsername,
      }}
    >
      {children}
    </BabyAppContext.Provider>
  );
};
