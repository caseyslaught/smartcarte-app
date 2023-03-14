import React from "react";
import { Button, Progress, Text, VStack } from "@chakra-ui/react";

import useDemo from "../../hooks/useDemo";

interface Props {}

const DemoTaskStatusBox: React.FC<Props> = () => {
  const { taskStatus, taskStatusMessage, taskStatusLongMessage } = useDemo();

  let color = "blue";
  let progress = 0;
  if (taskStatus === "loading") {
    progress = 10;
  } else if (taskStatus === "pending") {
    progress = 20;
  } else if (taskStatus === "running") {
    if (taskStatusMessage === "Fetching imagery") {
      progress = 40;
    } else if (taskStatusMessage === "Processing imagery") {
      progress = 60;
    } else if (taskStatusMessage === "Uploading assets") {
      progress = 80;
    }
  } else if (taskStatus === "complete") {
    progress = 100;
  } else if (taskStatus === "cancelled") {
    color = "gray";
    progress = 100;
  } else if (taskStatus === "failed") {
    color = "red";
    progress = 100;
  }

  return (
    <VStack align="flex-start" p="1em" w="100%" bg="offWhite" borderRadius="md">
      <Text fontWeight="bold">{taskStatusMessage}</Text>
      <Progress
        background="gray.200"
        borderRadius="md"
        colorScheme={color}
        hasStripe={progress !== 100}
        isAnimated={progress !== 100}
        size="sm"
        value={progress}
        w="100%"
      />
      {taskStatus === "failed" && (
        <Text fontSize="sm">{taskStatusLongMessage}</Text>
      )}

      {(taskStatus === "failed" || taskStatus === "cancelled") && (
        <Button
          colorScheme="blue"
          variant="outline"
          w="100%"
          _hover={{
            bg: "blue.600",
            color: "white",
          }}
          onClick={() => {
            window.location.href = "/demo";
          }}
        >
          Create new task
        </Button>
      )}
    </VStack>
  );
};

export default DemoTaskStatusBox;
