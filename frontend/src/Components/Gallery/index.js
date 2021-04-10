import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BabyAppContext } from "../../Context/BabyAppContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Photo from "./photo";
import { useGoogleMedia } from "../../Context/MediaContext";
import Loader from "react-loader-spinner";
import mountain from "../../Assets/mountain.jpg";

const Gallery = () => {
  let history = useHistory();
  const params = useParams();
  const {
    nextPageToken,
    galleryPageNumber,
    setGalleryPageNumber,
    albumId,
  } = useContext(BabyAppContext);
  const { mediaItems, fetchGoogleMedia, getAlbumId } = useGoogleMedia();

  const PAGE_SIZE = 4;
  const firstMediaOfPage = PAGE_SIZE * (galleryPageNumber - 1);
  const lastMediaOfPage = PAGE_SIZE * galleryPageNumber;

  useEffect(() => {
    if (albumId.includes("Error")) {
      console.log("Calling getAlbumId");
      getAlbumId();
    }
    if (mediaItems.length === 0 && albumId !== null) fetchGoogleMedia();
    setGalleryPageNumber(parseInt(params.pageNumber) || 1);
  }, []);

  const onClickNextPage = () => {
    if (galleryPageNumber * PAGE_SIZE >= mediaItems.length) {
      history.push(`/gallery/${galleryPageNumber}`);
      fetchGoogleMedia();
    } else {
      setGalleryPageNumber(galleryPageNumber + 1);
      history.push(`/gallery/${galleryPageNumber + 1}`);
    }
  };

  const onClickPreviousPage = () => {
    setGalleryPageNumber(galleryPageNumber - 1);
    history.push(`/gallery/${galleryPageNumber - 1}`);
  };

  if (albumId.includes("Error")) {
    return (
      <Wrapper>
        <GalleryWrapper>
          <Header>Error {albumId[1]}.</Header>
        </GalleryWrapper>
      </Wrapper>
    );
  } else if (mediaItems.error) {
    return (
      <Wrapper>
        <Header>Error {mediaItems.error}. Try logging in and out again!</Header>
      </Wrapper>
    );
  } else if (mediaItems.length === 0) {
    return (
      <Wrapper>
        <LoaderWrapper>
          <Loader
            type="Rings"
            color="#114b5f"
            height={100}
            width={100}
            timeout={10000} //3 secs
          />
        </LoaderWrapper>
      </Wrapper>
    );
  } else if (Math.ceil(mediaItems.length / PAGE_SIZE) < galleryPageNumber) {
    return (
      <Wrapper>
        <GalleryListTopRow>
          Page Number {galleryPageNumber} for this album does not exist
        </GalleryListTopRow>
      </Wrapper>
    );
  }
  return (
    <>
      <Wrapper>
        <GalleryWrapper>
          <Header>Gallery Page: {galleryPageNumber} </Header>
          <GalleryListTopRow>
            {mediaItems
              .slice(firstMediaOfPage, lastMediaOfPage - 2)
              .map((img, i) => {
                return (
                  <li key={i}>
                    <Photo link={img.baseUrl} />
                  </li>
                );
              })}
          </GalleryListTopRow>
          <GalleryListBottomRow>
            {mediaItems
              .slice(firstMediaOfPage + 2, lastMediaOfPage)
              .map((img, i) => {
                return (
                  <li key={i}>
                    <Photo link={img.baseUrl} />
                  </li>
                );
              })}
          </GalleryListBottomRow>
          <ButtonWrapper>
            <Button
              disabled={galleryPageNumber === 1}
              onClick={onClickPreviousPage}
            >
              Previous Page
            </Button>
            <Button
              disabled={
                galleryPageNumber * PAGE_SIZE >= mediaItems.length &&
                !nextPageToken
              }
              onClick={onClickNextPage}
            >
              Next Page
            </Button>
          </ButtonWrapper>
        </GalleryWrapper>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("${mountain}");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
`;

const Header = styled.h1`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #114b5f;
  color: #f3e9d2;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
`;

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  background-color: rgb(198, 218, 191, 0.8);
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const GalleryListTopRow = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const GalleryListBottomRow = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 100px;
  margin: 20px;
  background-color: #114b5f; /* Green */
  color: #f3e9d2;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  border-color: #f6f4d2;
  min-width: 150px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #f3e9d2; /* Green */
    color: #114b5f;
  }
  &:disabled {
    background-color: #114b5f; /* Green */
    color: #f3e9d2;
    cursor: auto;
  }
`;

export default Gallery;
