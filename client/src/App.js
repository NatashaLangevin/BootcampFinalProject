import Login from "./Login";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Comments from "./Comments";
import Gallery from "./Gallery";
import { LoginContext } from "./LoginContext";
import { useContext } from "react";

const App = () => {
  const { code, setCode } = useContext(LoginContext);
  if (!code) {
    const foundCode = new URLSearchParams(window.location.search).get("code");
    setCode(foundCode);
  }

  return code ? (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route exact path="/" element={<Dashboard code={code} />} />
          <Route exact path="/comments" element={<Comments />} />

          <Route exact path="/gallery" element={<Gallery />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
`;
