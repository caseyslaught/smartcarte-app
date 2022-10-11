import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";

import { ProtectedAPI, PublicAPI } from "../api";
import { AuthType, TokenType } from "../types/authTypes";
import useLocalToken from "../hooks/useLocalToken";
import { ACCESS_TOKEN_EXPIRES_MILLIS } from "../constants";

// TODO: is there a better way to initialize this?
export const AuthContext = createContext<AuthType>({
  token: null,
  checkToken: (token) => true,
  loginError: null,
  setLoginError: () => {},
  onLogin: () => {},
  onLogout: () => {},
  loginLoading: false,
  logoutLoading: false,
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useLocalToken();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  const checkToken = (token: TokenType | null): boolean => {
    if (!token) return false;

    const { lastRefresh, expiresIn } = token;

    if (!lastRefresh || !expiresIn) {
      setToken(null);
      navigate("/login");
      return false;
    }

    if (lastRefresh + expiresIn <= new Date().getTime()) {
      setToken(null);
      navigate("/login");
      return false;
    }

    /*
    try {
      const res = await PublicAPI.post("account/auth_test/", {
        refresh_token: token.refreshToken,
      });

      if (res.status === 200) {
        setToken({
          email: token.email,
          accessToken: res.data.access_token,
          refreshToken: token.refreshToken,
          lastRefresh: new Date().getTime(),
          expiresIn: ACCESS_TOKEN_EXPIRES_MILLIS,
        });
        return true;
      } else {
        setToken(null);
        navigate("/login");
        return false;
      }
    } catch (error) {
      console.warn(error);
      setToken(null);
      navigate("/login");
      return false;
    }
    */

    return true;
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoginLoading(true);
      const res = await PublicAPI.post("account/login/", {
        email,
        password,
      });
      if (res.status === 200) {
        setToken({
          email,
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          lastRefresh: new Date().getTime(),
          expiresIn: ACCESS_TOKEN_EXPIRES_MILLIS,
        });
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      setLoginError("Invalid email and password combination.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await ProtectedAPI.post("account/logout/");
    } catch (error) {
      console.log(error);
    } finally {
      setLogoutLoading(false);
      setToken(null);
      navigate("/login");
    }
  };

  const value = {
    token,
    checkToken,
    loginError,
    loginLoading,
    logoutLoading,
    setLoginError,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
