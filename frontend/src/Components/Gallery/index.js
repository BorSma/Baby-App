import React, { useContext } from "react";
import { BabyAppContext } from "../../Context/BabyAppContext";
import styled from "styled-components";
import Photo from "./photo";

const Gallery = () => {
  const {
    fetch,
    mediaItems,
    setMediaItems,
    setNextPageToken,
    nextPageToken,
  } = useContext(BabyAppContext);

  React.useEffect(() => {
    loadAlbum();
  }, []);

  const loadAlbum = async () => {
    const data = await fetch("/populategallery", {
      method: "POST",
    });
    setMediaItems(data.mediaItems);
    if ((nextPageToken === "")) setNextPageToken(data.nextPageToken);
  };

  return (
    <>
      <Title>This is the Gallery!</Title>
      {mediaItems.length !== 0 ? (
        <>
          <Wrapper>
            {mediaItems.map((img, i) => {
              return (
                <li>
                  <Photo link={img.baseUrl} key={img.id} />
                </li>
              );
            })}
            <button
              onClick={async () => {
                const data = await fetch("/populategallerynextpage", {
                  method: "POST",
                });
                setMediaItems(data.mediaItems);
                setNextPageToken(data.nextPageToken);
              }}
            >
              Next Page
            </button>
          </Wrapper>
        </>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

const Wrapper = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
`;

export default Gallery;
