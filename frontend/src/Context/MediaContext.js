import { useState, useContext, useEffect } from "react";
import { BabyAppContext } from "./BabyAppContext";

export const useGoogleMedia = () => {
  const {
    fetch,
    setNextPageToken,
    setAlbumId,
    albumId,
    accessToken,
  } = useContext(BabyAppContext);
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    console.log("mediaItems:", mediaItems);
  }, [mediaItems]);

  const getAlbumId = async () => {
    //let data = {};
    console.log("Console.log 1");
    if (localStorage.getItem("albumId")) {
      setAlbumId(localStorage.getItem("albumId"));
      console.log("Console.log 2");
    } else {
      let data = await fetch("/getAlbumId", {
        method: "GET",
      });
      console.log("getAlbumId data", data);
      console.log("Console.log 3");
      if (data.sharedAlbums) {
        const albums = data.sharedAlbums.filter((album, i) => {
          return album.title === "Test Share Album" && album.id;
        });
        setAlbumId(albums[0].id);
        localStorage.setItem("albumId", albums[0].id);
      } else if (data.error) {
        setAlbumId(["Error", `${data.error}`]);
      }
    }
  };

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
    } else if (data.error.error) setMediaItems(Object.values(data.error));
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
    getAlbumId,
  };
};
