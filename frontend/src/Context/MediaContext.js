import { useState, useContext } from "react";
import { BabyAppContext } from "./BabyAppContext";

export const useGoogleMedia = () => {
  const { fetch, setNextPageToken, setAlbumId, albumId } = useContext(
    BabyAppContext
  );
  const [mediaItems, setMediaItems] = useState([]);

  const getAlbumId = async () => {
    //let data = {};
    if (localStorage.getItem("albumId") && !albumId) {
      setAlbumId(localStorage.getItem("albumId"));
    } else {
      let data = await fetch("/getAlbumId", {
        method: "GET",
      });
      console.log("data", data);
      if (data.sharedAlbums) {
        const albums = data.sharedAlbums.filter((album, i) => {
          return album.title === "Test Share Album" && album.id;
        });
        setAlbumId(albums[0].id);
        localStorage.setItem("albumId", albums[0].id);
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
    getAlbumId,
  };
};
