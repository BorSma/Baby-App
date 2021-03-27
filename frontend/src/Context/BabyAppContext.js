import { createContext, useState, useEffect } from "react";

export const BabyAppContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [userdata, setUserdata] = useState({ name: null });
  const [formData, setFormdata] = useState({});
  const [targetDate, setTargetDate] = useState();
  const [targetDateTemp, setTargetDateTemp] = useState();
  const [_id, set_id] = useState();
  const [accessToken, setAccessToken] = useState();
  const [nextPageToken, setNextPageToken] = useState();
  const [galleryPageNumber, setGalleryPageNumber] = useState(1);

  const dateFrom = new Date();
  const dateTo = new Date(targetDate);
  var monthsLeft = 9 - (dateTo.getMonth() - dateFrom.getMonth());

  useEffect(() => {
    console.log(userdata);
    if (userdata.name !== null) {
      localStorage.setItem("name", userdata.name);
      localStorage.setItem("email", userdata.email);
      localStorage.setItem("picture", userdata.picture);
    }
  }, [userdata]);

  useEffect(() => {
    console.log(`nextPageToken`, nextPageToken);
  }, [nextPageToken]);

  const likeFetch = async (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        pageToken: nextPageToken ? `${nextPageToken}` : undefined,
        data: JSON.stringify({ ...formData }),
        _id: _id,
        monthsLeft: monthsLeft,
        targetDate: targetDateTemp,
      },
    }).then((res) => res.json());
  };

  const fetchTargetDate = async () => {
    const data = await likeFetch("/populatetargetdate", {
      method: "GET",
    });
    setTargetDate(`${data.data.value}`);
  };

  const updateTargetDate = async () => {
    await likeFetch("/updateTargetDate", {
      method: "PUT",
    });
    fetchTargetDate();
  };

  useEffect(() => {
    console.log("targetDate:", targetDate);
  }, [targetDate]);

  useEffect(() => {
    console.log("targetDateTemp:", targetDateTemp);
  }, [targetDateTemp]);

  // useEffect(() => {
  //   console.log("Token", accessToken);
  // }, [token, accessToken]);

  // useEffect(() => {
  //   console.log("formData", formData);
  // }, [formData]);

  // useEffect(() => {
  //   console.log("_id", _id);
  // }, [_id]);

  return (
    <BabyAppContext.Provider
      value={{
        userdata,
        formData,
        nextPageToken,
        galleryPageNumber,
        _id,
        targetDate,
        targetDateTemp,
        setTargetDateTemp,
        setTargetDate,
        set_id,
        setGalleryPageNumber,
        setNextPageToken,
        setUserdata,
        setAccessToken,
        setFormdata,
        updateTargetDate,
        fetch: likeFetch,
        fetchTargetDate,
      }}
    >
      {children}
    </BabyAppContext.Provider>
  );
};
