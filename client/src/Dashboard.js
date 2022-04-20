import React, { useState, useEffect, useContext } from "react";
import TrackSearchResult from "./TrackSearchResult";
import "./input.css";
import styled from "styled-components";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "./Player";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";
import { LoginContext } from "./LoginContext";

const spotifyApi = new SpotifyWebApi({
  clientId: "fb2f5dee35c34caf86d6d15b325c8ee4",
});

const Dashboard = ({ code, handleSelect }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  const [track, setTrack] = useState();
  const { userInfo, setUserInfo } = useContext(LoginContext);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  };

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getMe()
      .then(
        function (data) {
          setUserInfo({
            userName: data.body.display_name,
            email: data.body.email,
          });
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      )
      .then(
        fetch("/api/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
      )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks("artist:Led Zeppelin").then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          const newSearchResults = searchResults.filter((track) => {
            return track.name.toLowerCase().includes(search.toLowerCase());
          });
          setSearchResults(newSearchResults);
          console.log(newSearchResults);
          return {
            artist: track.artists[0].name,
            title: track.name,
            album: track.album.name,
            release: track.album.release_date,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <>
      <Wrapper>
        <Header />
        <PlayerContainer>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </PlayerContainer>
        <form>
          <InputDiv
            type="search"
            placeholder="Search Songs"
            value={search}
            onChange={(ev) => {
              setSearch(ev.target.value);
            }}
          />
        </form>
        <div>
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 2000px;
`;

const PlayerContainer = styled.div`
  margin-top: 100px;
  display: flex;
  width: 400px;
`;
const InputDiv = styled.input`
  height: 30px;
  width: 300px;
  padding: 15px;
  margin: 8px;
  margin-top: 100px;
  border: none;
  background-color: lightgray;
`;
