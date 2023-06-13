import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);
  const isLoggedIn = () => {
    return user !== null;
  };

  const value = {
    user,
    setUser,
    isLoggedIn,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserProvider;
