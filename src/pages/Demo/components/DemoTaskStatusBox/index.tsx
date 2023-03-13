import React from "react";
import { Progress, Text, VStack } from "@chakra-ui/react";
import useDemo from "../../hooks/useDemo";

interface Props {}

const DemoTaskStatusBox: React.FC<Props> = () => {
  const { taskStatus, taskStatusMessage } = useDemo();

  console.log("taskStatus", taskStatus);

  let progress = 0;
  switch (taskStatus) {
    case "loading":
      progress = 10;
      break;
    case "pending":
      progress = 20;
      break;
    case "fetching_imagery":
      progress = 40;
      break;
    case "processing_imagery":
      progress = 60;
      break;
    case "uploading_assets":
      progress = 80;
      break;
    case "complete":
      progress = 100;
      break;
    default:
      progress = 0;
  }

  return (
    <VStack align="flex-start" p="1em" w="100%" bg="offWhite" borderRadius="md">
      <Text fontWeight="bold">{taskStatusMessage}</Text>
      <Progress
        background="gray.200"
        borderRadius="md"
        colorScheme="blue"
        hasStripe={true}
        isAnimated={true}
        size="sm"
        value={progress}
        w="100%"
      />
    </VStack>
  );
};

export default DemoTaskStatusBox;
