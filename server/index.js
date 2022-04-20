"use strict";
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const fetch = require("node-fetch");
const { appendFile } = require("fs");
require("dotenv").config();

const {
  getEmail,
  getUserName,
  getUserComments,
  addComment,
  addUser,
  updateUser,
  deleteUser,
} = require("./handlers");
express()
  .use(morgan("dev"))
  .use(express.json())
  .use(cors())

  .get("/api/get-user-email", getEmail)
  .get("/api/get-userName", getUserName)
  .get("/api/get-user-comments/:userId", getUserComments)
  .post("/api/add-comment", addComment)
  .post("/api/add-user", addUser)
  .patch("/api/update-user/:_id", updateUser)
  .delete("/api/delete-user/:_id", deleteUser)

  .post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000",
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      refreshToken,
    });

    spotifyApi
      .refreshAccessToken()
      .then((data) => {
        express.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch(() => {
        res.sendStatus(400);
      });
  })

  .post("/login", async (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000",
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
    });
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        console.log(data);
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch(() => {
        res.sendStatus(400);
      });
  })

  .listen(3001, () => console.log(`Listening on 3001`));
