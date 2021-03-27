import { useState, useContext } from "react";
import { BabyAppContext } from "./BabyAppContext";

export const useGoogleMedia = () => {
  const { fetch, setNextPageToken } = useContext(BabyAppContext);
  const [mediaItems, setMediaItems] = useState([]);

  const fetchGoogleMedia = async () => {
    if (mediaItems.length === 0) {
      getFirstMedia();
    } else {
      getNextPageMedia();
    }
  };

  const getFirstMedia = async () => {
    const data = await fetch("/populategallery", {
      method: "POST",
    });
    if (data.mediaItems) {
      setMediaItems(data.mediaItems);
    }
    setNextPageToken(data.nextPageToken);
  };

  const getNextPageMedia = async () => {
    const data = await fetch("/populategallerynextpage", {
      method: "POST",
    });
    setMediaItems([...mediaItems, data.mediaItems]);
    console.log(data);
    setNextPageToken(data.nextPageToken);
  };

  return {
    mediaItems,
    fetchGoogleMedia,
  };
};
