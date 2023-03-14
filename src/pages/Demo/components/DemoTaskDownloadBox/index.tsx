import React from "react";
import { Button, Link, VStack } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";

import useDemo from "../../hooks/useDemo";

interface Props {}

const DemoTaskDownloadBox: React.FC<Props> = () => {
  const { taskImageryHref, taskClassificationHref } = useDemo();

  // if both are null then don't show box
  if (!taskImageryHref && !taskClassificationHref) return null;

  return (
    <VStack p="1em" w="100%" bg="offWhite" borderRadius="md">
      {taskImageryHref && (
        <Link href={taskImageryHref} download w="100%">
          <Button
            colorScheme="blue"
            variant="outline"
            w="100%"
            leftIcon={<FiDownload />}
            _hover={{
              bg: "blue.500",
              color: "white",
            }}
          >
            Download imagery
          </Button>
        </Link>
      )}
      {taskClassificationHref && (
        <Link href={taskClassificationHref} download w="100%">
          <Button
            colorScheme="blue"
            variant="outline"
            w="100%"
            leftIcon={<FiDownload />}
            _hover={{
              bg: "blue.500",
              color: "white",
            }}
          >
            Download classification
          </Button>
        </Link>
      )}
    </VStack>
  );
};

export default DemoTaskDownloadBox;
