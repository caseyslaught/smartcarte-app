import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import useTask from "./hooks/useTask";
import DemoMap from "./components/DemoMap";
import DemoSidebar from "./components/DemoSidebar";

interface Props {}

const DemoPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { taskUid } = useParams();
  const [task, taskComplete] = useTask({ taskUid });

  // if there is a taskUid but it's not valid, redirect to demo page
  useEffect(() => {
    if (taskUid && !task && taskComplete) {
      navigate("/demo");
    }
  }, [taskUid, task, taskComplete, navigate]);

  useEffect(() => {
    document.title = "Smart Carte | Demo";
  }, []);

  return (
    <Flex h="100%" w="100%" position="relative">
      <DemoMap />
      <DemoSidebar />
    </Flex>
  );
};

export default DemoPage;
