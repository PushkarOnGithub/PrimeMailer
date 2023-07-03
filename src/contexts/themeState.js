import React, { useState, createContext } from "react";

const themecontext = createContext();
const ThemeState = (props) => {
    const [theme, setTheme] = useState("light");
  return (
      <themecontext.Provider value={{ theme, setTheme }}>
      {props.children}
    </themecontext.Provider>
  );
};
export {themecontext}
export default ThemeState;
