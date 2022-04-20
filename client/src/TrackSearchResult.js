import React from "react";
import styled from "styled-components";

const TrackSearchResult = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };
  return (
    <Wrapper>
      <Image
        onClick={handlePlay}
        src={track.albumUrl}
        alt="album cover image"
        style={{ height: "64px", width: "64px" }}
      />
      <Title>{track.title}</Title>
      <Album>
        {track.album}
        {track.release}
      </Album>
    </Wrapper>
  );
};
export default TrackSearchResult;

const Wrapper = styled.div`
  display: flex;
  margin: 2px;
  align-items: center;
`;
const Image = styled.img`
  display: flex;
  height: 64px;
  width: 64px;
`;

const Title = styled.div`
  margin-left: 3px;
  font-weight: bold;
  color: white;
`;

const Album = styled.div`
  margin-left: 2px;
  font-style: italic;
`;
