import { useState, useContext } from "react";
import styled from "styled-components";
import Header from "./Header";
import { LoginContext } from "./LoginContext";

import "./input.css";

const Comments = () => {
  const [charCount, setCharCount] = useState(280);
  const [textArea, setTextArea] = useState();
  const { userInfo, setUserInfo } = useContext(LoginContext);

  const handleChange = (ev) => {
    setTextArea(ev.target.value);
    setCharCount(280 - textArea.length);
  };
  const active = charCount < 280 && charCount >= 0 ? false : true;
  const handleSubmit = (e) => {
    const data = { userId: userInfo.email, comment: textArea };

    fetch("/api/add-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        e.preventDefault();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <Wrapper>
      <Header />
      <Band>To Be A Rock And Not To Roll</Band>
      <Form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write A Comment"
          onChange={handleChange}
          value={textArea}
        ></textarea>
        <Posting>
          <CharCount chars={charCount}>{charCount}</CharCount>
          <Button disabled={active}>Post</Button>
        </Posting>
      </Form>
    </Wrapper>
  );
};

export default Comments;

const handleColorType = (chars) => {
  if (chars < 0) {
    return "red";
  } else if (chars < 55) {
    return "yellow";
  } else {
    return " black";
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
`;
const Band = styled.p`
  font-weight: Bold;
  font-size: 28px;
  text-align: center;
  padding: 10px;
  background-color: gold;
  height: 40px;
  width: 1800px;
  margin-top: 100px;
`;

const Button = styled.button`
  background-color: gold;
  color: black;
  font-size: 18px;
  padding: 12px 25px;
  border-radius: 35px;
  margin: 10px;
`;
const Form = styled.form`
  margin-top: 18px;
  border: 1px solid lightgray;
  border-bottom: 12px solid lightgray;
  background-color: lightgray;
`;
const Posting = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: right;
`;
const CharCount = styled.p`
  color: ${({ chars }) => handleColorType(chars)};
`;
