import { createContext, useState, useEffect } from "react";

export const BabyAppContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [status, setStatus] = useState("idle");
  const [userdata, setUserdata] = useState({ name: null });
  const [formData, setFormdata] = useState({});
  const [targetDate, setTargetDate] = useState();
  const [targetDateTemp, setTargetDateTemp] = useState();
  const [_id, set_id] = useState({ _id: "", action: "" });
  const [accessToken, setAccessToken] = useState(null);
  const [nextPageToken, setNextPageToken] = useState();
  const [galleryPageNumber, setGalleryPageNumber] = useState(1);
  const [albumId, setAlbumId] = useState(null);
  const [monthsLeft, setMonthsLeft] = useState();

  useEffect(() => {
    if (localStorage.getItem("name") !== null && status === "idle") {
      setUserdata({
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        picture: localStorage.getItem("picture"),
        role: localStorage.getItem("role"),
      });
    } else if (userdata.name !== null) {
      localStorage.setItem("name", userdata.name);
      localStorage.setItem("email", userdata.email);
      localStorage.setItem("picture", userdata.picture);
      localStorage.setItem("role", userdata.role);
    }
    setStatus("loaded");
  }, [userdata]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAccessToken(localStorage.getItem("accessToken"));
    }
  }, [accessToken]);

  const likeFetch = async (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        //Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        Authorization: `Bearer ${accessToken}`,
        //pageToken: nextPageToken ? `${nextPageToken}` : undefined,
        pageToken: `${nextPageToken}`,
        data: JSON.stringify({ ...formData, bought: "false" }),
        _id: _id._id,
        monthsLeft: monthsLeft,
        targetDate: targetDateTemp,
        albumId: albumId,
        buyer: userdata.name,
      },
    }).then((res) => res.json());
  };

  const fetchTargetDate = async () => {
    const data = await likeFetch("/populatetargetdate", {
      method: "GET",
    });
    const newTargetDate = `${data.data.value}`;
    setTargetDate(newTargetDate);
    var months =
      9 - (new Date(newTargetDate).getMonth() - new Date().getMonth());
    setMonthsLeft(months);
  };

  const updateTargetDate = async () => {
    await likeFetch("/updateTargetDate", {
      method: "PUT",
    });
    fetchTargetDate();
  };

  useEffect(() => {
    if (!targetDate) fetchTargetDate();
  }, []);
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
        status,
        albumId,
        setAlbumId,
        setGalleryPageNumber,
        setNextPageToken,
        setUserdata,
        setAccessToken,
        setFormdata,
        updateTargetDate,
        fetch: likeFetch,
        fetchTargetDate,
        setStatus,
        monthsLeft,
        setMonthsLeft,
      }}
    >
      {children}
    </BabyAppContext.Provider>
  );
};
