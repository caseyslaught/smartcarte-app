export interface TokenType {
  email: string;
  accessToken: string;
  refreshToken: string;
  lastRefresh?: number;
  expiresIn?: number;
}

export interface AuthType {
  token: TokenType | null;
  checkToken: (token: TokenType | null) => boolean;
  loginError: string | null;
  setLoginError: (error: string | null) => void;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  loginLoading: boolean;
  logoutLoading: boolean;
}
