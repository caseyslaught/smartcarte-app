import { RegistrationType } from "./formTypes";

export interface TokenType {
  email: string;
  accessToken: string;
  refreshToken: string;
  lastRefresh?: number;
  expiresIn?: number;
}

export interface AuthType {
  token: TokenType | null;
  loginLoading: boolean;
  logoutLoading: boolean;
  registerLoading: boolean;
  loginError: string | null;
  registerError: string | null;
  checkToken: (token: TokenType | null) => boolean;
  setLoginError: (error: string | null) => void;
  setRegisterError: (error: string | null) => void;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  onRegister: (account: RegistrationType) => void;
}
