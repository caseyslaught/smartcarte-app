import React, { useEffect, useState } from "react";
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
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(!isMobile);

  useTask({ taskUid, paramTaskUid }); // sets up task state - this must be above the useEffect below

  useEffect(() => {
    const newTaskUid = paramTaskUid !== undefined ? paramTaskUid : null;
    setTaskUid(newTaskUid);
  }, [paramTaskUid, setTaskUid]);

  useEffect(() => {
    document.title = "Smart Carte | Land Cover Demo";
    window.scrollTo(0, 1);
  }, []);

  return (
    <Flex h="100%" w="100%" position="relative">
      <DemoMap isMobile={isMobile} isSidebarExpanded={isSidebarExpanded} />
      <DemoSidebar
        isMobile={isMobile}
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
    </Flex>
  );
};

export default DemoPage;
