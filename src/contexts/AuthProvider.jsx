import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { login as apiLogin, refreshToken as apiRefreshToken } from "../api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const navigate = useNavigate();

  // Function to check accessToken expiration and refresh it if necessary
  const checkTokenExpiration = async () => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      // If the accessToken has expired
      if (decodedToken.exp < currentTime) {
        try {
          const response = await apiRefreshToken();
          setAccessToken(response.accessToken);
          localStorage.setItem("accessToken", response.accessToken);
        } catch (error) {
          console.error("Failed to refresh accessToken", error);
          alert("session timed out");
          logout();
        }
      }
    }
  };

  useEffect(() => {
    // Set an interval to check token expiration periodically
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000); // Check every 5 minutes
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [accessToken]);

  const login = async (username, password) => {
    try {
      const response = await apiLogin(username, password); // Use the login function from api.js
      setUser({ username });
      setAccessToken(response.accessToken);
      localStorage.setItem("user", JSON.stringify({ username }));
      localStorage.setItem("accessToken", response.accessToken);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
