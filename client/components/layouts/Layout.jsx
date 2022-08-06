import React, { useState } from "react";
import NavBar from "./NavBar";
function Layout({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-neutral-100 dark:bg-gray-800 min-h-screen">
        <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />

        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
