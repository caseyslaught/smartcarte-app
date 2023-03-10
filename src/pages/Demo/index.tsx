import React, { useEffect } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import useTask from "./hooks/useTask";
import DemoMap from "./components/DemoMap";
import DemoSidebar from "./components/DemoSidebar";

interface Props {}

const DemoPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { taskUid } = useParams();
  const [task, taskComplete] = useTask({ taskUid });

  const [isMobile] = useMediaQuery("(max-width: 767px)", { ssr: false });

  // if there is a taskUid but it's not valid, redirect to demo page
  useEffect(() => {
    if (taskUid && !task && taskComplete) {
      navigate("/demo");
    }
  }, [taskUid, task, taskComplete, navigate]);

  useEffect(() => {
    document.title = "Smart Carte | Demo";
    window.scrollTo(0, 1);
  }, []);

  return (
    <Flex h="100%" w="100%" position="relative">
      <DemoMap isMobile={isMobile} />
      <DemoSidebar isMobile={isMobile} />
    </Flex>
  );
};

export default DemoPage;
