import { PublicAPI } from "./index";

interface CurrentUser {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // lifetime of access token in milliseconds
  lastRefresh: number; // time since epoch since access token refresh in milliseconds
}

const CURRENT_USER_KEY = "currentUser";

export const refreshToken = async (): Promise<CurrentUser | null> => {
  const currentUserStr = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUserStr) return null;

  let currentUser = JSON.parse(currentUserStr);

  try {
    const res = await PublicAPI.post("account/refresh/", {
      refresh_token: currentUser.refreshToken,
    });

    if (res.status === 200) {
      currentUser.accessToken = res.data.access_token;
      currentUser.lastRefresh = new Date().getTime();
      currentUser.expiresIn = 300000;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      return currentUser;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};
