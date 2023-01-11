import React from "react";

type SetType = (value: any) => void;

const useLocalStorage = (key: string, initialValue: any): [any, SetType] => {
  const [storedValue, setStoredValue] = React.useState<any>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return null;
    }
  });

  const setValue = (value: any) => {
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
