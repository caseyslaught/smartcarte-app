import { useContext } from "react";
import { DemoStateContext } from "../context/demoStateContext";

const useDemo = () => {
  return useContext(DemoStateContext);
};

export default useDemo;
