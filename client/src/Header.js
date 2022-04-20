import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Wrapper>
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA2Az09XlG7p6tKeg8z61jwafSxdNedOqLEg&usqp=CAU"
        alt="band name"
      />
      <BannerImage
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Bo3Z8mRnN-bVRHQwfrPaemQNgP7UCIH6jQ&usqp=CAU"
        alt="band on stage"
      />
      <NavBar>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/comments">Comments</StyledNavLink>
        <StyledNavLink to="/gallery">Gallery</StyledNavLink>
      </NavBar>
    </Wrapper>
  );
};
export default Header;

const Wrapper = styled.div`
  display: flex;
`;

const NavBar = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-evenly;
  padding: 30px;
  width: 1800px;
  z-index: 10;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 20px;
  color: gold;
  margin-top: 5px;
  margin-right: 10px;
  padding: 10px;
  text-decoration: none;
  font-weight: bold;
`;
const Image = styled.img`
  display: flex;
  position: relative;
  width: 1800px;
  height: 400px;
`;

const BannerImage = styled.img`
  display: flex;
  position: absolute;
  width: 1000px;
  height: 200px;
  margin-top: 300px;
  margin-left: 350px;
`;
