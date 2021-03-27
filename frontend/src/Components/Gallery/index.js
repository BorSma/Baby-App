import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BabyAppContext } from "../../Context/BabyAppContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Photo from "./photo";
import { useGoogleMedia } from "../../Context/MediaContext";

const Gallery = () => {
  let history = useHistory();
  const params = useParams();
  const { nextPageToken, galleryPageNumber, setGalleryPageNumber } = useContext(
    BabyAppContext
  );
  const { mediaItems, fetchGoogleMedia } = useGoogleMedia();
  setGalleryPageNumber(parseInt(params.pageNumber) || 1);

  const PAGE_SIZE = 4;
  const firstMediaOfPage = PAGE_SIZE * (galleryPageNumber - 1);
  const lastMediaOfPage = PAGE_SIZE * galleryPageNumber;

  useEffect(() => {
    if (mediaItems.length === 0) fetchGoogleMedia();
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

  if (mediaItems.length === 0) {
    return <p>loading</p>;
  } else if (Math.ceil(mediaItems.length / PAGE_SIZE) < galleryPageNumber) {
    return (
      <GalleryList>
        Page Number {galleryPageNumber} for this album does not exist
      </GalleryList>
    );
  }
  return (
    <>
      <Wrapper>
        <GalleryList>
          {mediaItems.slice(firstMediaOfPage, lastMediaOfPage).map((img, i) => {
            return (
              <li>
                <Photo link={img.baseUrl} key={i} />
              </li>
            );
          })}
        </GalleryList>
        <ButtonWrapper>
          <PreviousPage
            disabled={galleryPageNumber === 1}
            onClick={onClickPreviousPage}
          >
            Previous Page
          </PreviousPage>
          <NextPage
            disabled={
              galleryPageNumber * PAGE_SIZE >= mediaItems.length &&
              !nextPageToken
            }
            onClick={onClickNextPage}
          >
            Next Page
          </NextPage>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GalleryList = styled.ul`
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

const Title = styled.h1`
  text-align: center;
`;

const NextPage = styled.button``;

const PreviousPage = styled.button``;

export default Gallery;
