import React, { useState } from "react";

export const LoginContext = React.createContext();
export const LoginProvider = ({ children }) => {
  const [code, setCode] = useState("");
  const [userInfo, setUserInfo] = useState();
  return (
    <LoginContext.Provider
      value={{
        code,
        setCode,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
