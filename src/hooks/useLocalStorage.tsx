import React from "react";

type SetType = (value: number) => void;

const useLocalStorage = (
  key: string,
  initialValue: number
): [number, SetType] => {
  const [storedValue, setStoredValue] = React.useState<number>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return null;
    }
  });

  const setValue = (value: number) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event(key));
    } catch (error) {
      console.warn(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
