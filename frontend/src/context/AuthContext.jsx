/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

 const AuthContext = createContext();
export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("user-info")) || null)
  return <AuthContext.Provider value={{authUser, setAuthUser}}>{children}</AuthContext.Provider>;
};
