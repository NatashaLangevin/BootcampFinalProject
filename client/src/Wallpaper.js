import React from "react";
import styled from "styled-components";

const Wallpaper = () => {
  return (
    <Wrapper>
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43SntLbd6R-ywOwxT69I1IAnNyI3og4vIVA&usqp=CAU"
        alt="hermit"
      />
    </Wrapper>
  );
};
export default Wallpaper;

const Wrapper = styled.div`
  height: 100%;
  position: absolute;
`;

const Image = styled.img`
  position: relative;
  display: flex;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
