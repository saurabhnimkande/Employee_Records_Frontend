import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(true);
  const [idUser, setIdUser] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("employeeToken"));
    if (token === undefined || token === "" || token === null) {
      setAuth(false);
    }
  }, []);

  const updateAuthFalse = () => {
    localStorage.removeItem("employeeToken");
    setAuth(false);
    navigate(`/`);
  };

  const updateAuthTrue = () => {
    setAuth(true);
  };

  const setId = (value) => {
    setIdUser(value);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setId, idUser, updateAuthFalse, updateAuthTrue }}
    >
      {children}
    </AuthContext.Provider>
  );
};
