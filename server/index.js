const path = require("path");
const express = require("express");
const morgan = require("morgan");
const SpotifyWebApi = require("spotify-web-api-node");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;

express()
  .use(morgan("dev"))
  .use(express.json())

  .get("/api/songs", async (req, res, next) => {
    // credentials are optional
    const spotifyApi = new SpotifyWebApi({
      clientId: "fb2f5dee35c34caf86d6d15b325c8ee4",
      clientSecret: "0fb55879339642679a76a2896f264350",
      redirectUri: "http://localhost:3000",
    });
    const clientId = "fb2f5dee35c34caf86d6d15b325c8ee4";
    const clientSecret = "0fb55879339642679a76a2896f264350";
    const authString = Buffer.from(clientId + ":" + clientSecret).toString(
      "base64"
    );
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const { access_token } = await response.json();
    spotifyApi.setAccessToken(access_token);
    //verified!
    spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
      function (data) {
        console.log("Artist albums", data.body);
      },
      function (err) {
        console.error(err);
      }
    );
  })

  .listen(8000, () => console.log(`Listening on 8000`));
