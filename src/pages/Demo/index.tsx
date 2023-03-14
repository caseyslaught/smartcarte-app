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

  console.log("taskUid", taskUid);

  useTask({ taskUid }); // sets task state if taskUid is legit

  useEffect(() => {
    if (paramTaskUid) setTaskUid(paramTaskUid);
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
