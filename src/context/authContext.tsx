import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";

import { ProtectedAPI, PublicAPI } from "../api";
import useLocalToken from "../hooks/useLocalToken";
import { ACCESS_TOKEN_EXPIRES_MILLIS } from "../constants";
import { AuthType, TokenType } from "../types/authTypes";
import { RegistrationType } from "../types/formTypes";

// TODO: is there a better way to initialize this?
export const AuthContext = createContext<AuthType>({
  token: null,
  checkToken: (token) => true,
  loginError: null,
  setLoginError: () => {},
  registerError: null,
  setRegisterError: () => {},
  onLogin: () => {},
  onLogout: () => {},
  onRegister: () => {},
  loginLoading: false,
  logoutLoading: false,
  registerLoading: false,
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useLocalToken();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();

  const checkToken = (token: TokenType | null): boolean => {
    if (!token) return false;

    const { lastRefresh, expiresIn } = token;
    if (!lastRefresh || !expiresIn) {
      setToken(null);
      return false;
    }

    /*
    if (lastRefresh + expiresIn <= new Date().getTime()) {
      setToken(null);
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

  const handleRegistration = async (account: RegistrationType) => {
    try {
      setRegisterLoading(true);
      const res = await PublicAPI.post("account/register/", {
        email: account.email,
        password: account.password,
        organization_name: account.organizationName,
        first_name: account.firstName,
        last_name: account.lastName,
      });
      if (res.status === 201) {
        setToken({
          email: account.email,
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          lastRefresh: new Date().getTime(),
          expiresIn: ACCESS_TOKEN_EXPIRES_MILLIS,
        });
        navigate("/dashboard", { replace: true });
      }
    } catch (error: unknown) {
      setRegisterError("This email might already be in use.");
    } finally {
      setRegisterLoading(false);
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
    loginLoading,
    logoutLoading,
    registerLoading,
    loginError,
    registerError,
    checkToken,
    setLoginError,
    setRegisterError,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegistration,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
