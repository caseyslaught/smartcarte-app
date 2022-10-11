import React from "react";

import { CURRENT_USER_KEY } from "../constants";
import { TokenType } from "../types/authTypes";

const LOCAL_STORAGE_EVENT_KEY = "localStorage";

type TokenValue = TokenType | null;
type SetValue = (value: TokenType | null) => void;

const useLocalToken = (): [TokenValue, SetValue] => {
  const [storedValue, setStoredValue] = React.useState<TokenValue>(() => {
    try {
      const item = window.localStorage.getItem(CURRENT_USER_KEY);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(error);
      return null;
    }
  });

  const setValue = (value: TokenValue) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(value));
      window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT_KEY));
    } catch (error) {
      console.warn(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalToken;
