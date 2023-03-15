import React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FiCalendar, FiMap } from "react-icons/fi";
import useDemo from "../../hooks/useDemo";

interface Props {}

const DemoTaskParametersBox: React.FC<Props> = () => {
  const { taskDate, taskType } = useDemo();

  let taskTypeText = "";
  switch (taskType) {
    case "demo_classification":
      taskTypeText = "landcover classification";
      break;
    default:
      taskTypeText = "Unknown";
  }

  let taskDateText = "";
  if (taskDate) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    taskDateText = taskDate.toLocaleString("en-US", options);
  }

  return (
    <VStack
      p="1em"
      w="100%"
      bg="offWhite"
      borderRadius="md"
      pointerEvents="auto"
    >
      <FormControl id="taskType">
        <FormLabel>Task type</FormLabel>
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          bg="demoMediumDark"
          color="offWhite"
          borderRadius="md"
          px="0.7em"
          py="0.5em"
        >
          <Text>{taskTypeText}</Text>
          <Icon as={FiMap} />
        </Flex>
      </FormControl>
      <FormControl id="date">
        <FormLabel>Date</FormLabel>
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          bg="demoMediumDark"
          color="offWhite"
          borderRadius="md"
          px="0.7em"
          py="0.5em"
        >
          <Text>{taskDateText}</Text>
          <Icon as={FiCalendar} />
        </Flex>
      </FormControl>
    </VStack>
  );
};

export default DemoTaskParametersBox;
