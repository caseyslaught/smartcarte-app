import { useContext } from "react";
import { AppContext } from "../context/appContext";

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
