import { useContext } from "react";
import { DemoContext } from "../context/demoContext";

const useDemo = () => {
  return useContext(DemoContext);
};

export default useDemo;
