import { useState, useContext, useEffect } from "react";
import { BabyAppContext } from "./BabyAppContext";

export const useGoogleMedia = () => {
  const {
    fetch,
    setNextPageToken,
    setAlbumId,
  } = useContext(BabyAppContext);
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    console.log("mediaItems:", mediaItems);
  }, [mediaItems]);

  const getAlbumId = async () => {
    if (localStorage.getItem("albumId")) {
      setAlbumId(localStorage.getItem("albumId"));
    } else {
      let data = await fetch("/getAlbumId", {
        method: "GET",
      });
      if (data.sharedAlbums) {
        const albums = data.sharedAlbums.filter((album, i) => {
          return album.title === "Banya 2021" && album.id;
          //return album.id;
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
