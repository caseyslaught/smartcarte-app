import React, { useEffect } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import useTask from "./hooks/useTask";
import DemoMap from "./components/DemoMap";
import DemoSidebar from "./components/DemoSidebar";
import useDemo from "./hooks/useDemo";

interface Props {}

const DemoPage: React.FC<Props> = () => {
  const [isMobile] = useMediaQuery("(max-width: 767px)", { ssr: false });
  const { taskUid: paramTaskUid } = useParams();
  const { taskUid, setTaskUid } = useDemo();

  useTask({ taskUid, paramTaskUid }); // sets up task state - this must be above the useEffect below

  useEffect(() => {
    const newTaskUid = paramTaskUid !== undefined ? paramTaskUid : null;
    setTaskUid(newTaskUid);
  }, [paramTaskUid, setTaskUid]);

  useEffect(() => {
    document.title = "Smart Carte | Demo";
    window.scrollTo(0, 1);
  }, []);

  return (
    <Flex h="100%" w="100%" position="relative">
      <DemoMap />
      <DemoSidebar isMobile={isMobile} />
    </Flex>
  );
};

export default DemoPage;
