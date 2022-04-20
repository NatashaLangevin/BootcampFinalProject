import React from "react";
import styled from "styled-components";
import "./input.css";
import Wallpaper from "./Wallpaper";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fb2f5dee35c34caf86d6d15b325c8ee4&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state ";

const Login = () => {
  return (
    <>
      <Wrapper>
        <Wallpaper />

        <LoginLink
          href="https://accounts.spotify.com/authorize?client_id=fb2f5dee35c34caf86d6d15b325c8ee4&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state 
          "
        >
          {" "}
          Login with Spotify
        </LoginLink>
      </Wrapper>
    </>
  );
};
export default Login;

const Wrapper = styled.div`
  display: flex;
`;

const LoginLink = styled.a`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: gold;
  text-decoration: none;
  border: 2px solid white;
  padding: 10px;
  border-radius: 8px;
  font-size: 26px;
  font-weight: bold;
`;
