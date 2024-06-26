import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !isTokenExpired(storedToken)) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserInfo(getUserInfoFromToken(storedToken));
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    if (token) {
      const checkTokenExpiration = () => {
        if (isTokenExpired(token)) {
          logout();
        }
      };

      const interval = setInterval(checkTokenExpiration, 1000 * 60);
      return () => clearInterval(interval);
    }
  }, [token]);

  const isTokenExpired = (token) => {
    try {
      const decoded = parseJwt(token);
      return decoded.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  };

  const parseJwt = (token) => {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const getUserInfoFromToken = (token) => {
    try {
      const decoded = parseJwt(token);
      return decoded || null;
    } catch (e) {
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken(null);
    setUserInfo(null);
  };

  const login = (newToken) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUserInfo(getUserInfoFromToken(newToken));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logout, login, token, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
