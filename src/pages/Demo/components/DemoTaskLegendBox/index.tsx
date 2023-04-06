import React from "react";
import { Flex, HStack, Square, Text, VStack } from "@chakra-ui/react";

import useDemo from "../../hooks/useDemo";

interface Props {}

const DemoTaskLegendBox: React.FC<Props> = () => {
  const { taskStatistics } = useDemo();

  if (!taskStatistics) return null;

  const sortedClasses = Object.keys(taskStatistics).sort((a, b) =>
    taskStatistics[a].percent_masked > taskStatistics[b].percent_masked ? -1 : 1
  );

  return (
    <VStack
      p="1em"
      w="100%"
      bg="offWhite"
      spacing={1}
      borderRadius="md"
      pointerEvents="auto"
    >
      {sortedClasses.map((className) => {
        return (
          <LegendRow
            key={className}
            className={className}
            percentage={taskStatistics[className]?.percent_masked}
          />
        );
      })}
    </VStack>
  );
};

interface LegendRowProps {
  className: string;
  percentage: number;
}

const LegendRow: React.FC<LegendRowProps> = ({ className, percentage }) => {
  let color = "#000000";
  let name = className;
  switch (className) {
    case "cultivated":
      color = "#d9c30a";
      name = "Cultivation";
      break;
    case "bare_natural":
      color = "#9e9e91";
      name = "Bare ground";
      break;
    case "bare_artificial":
      color = "#b0051f";
      name = "Built";
      break;
    case "semi_natural_vegetation":
      color = "#3fcc52";
      name = "Natural vegetation";
      break;
    case "woody":
      color = "#135c2e";
      name = "Trees";
      break;
    case "water":
      color = "#067cd6";
      name = "Water";
      break;
    case "snow_ice":
      color = "#cdddf7";
      name = "Snow / ice";
      break;
    default:
      break;
  }

  let percentageString = "";
  if (percentage || percentage === 0) {
    percentageString = `${(percentage * 100).toFixed(2)}%`;
  }

  return (
    <Flex justify="space-between" w="100%">
      <HStack align="center" justify="center">
        <Square size="16px" bg={color} borderRadius="sm" />
        <Text>{name}</Text>
      </HStack>
      <Text fontWeight="bold">{percentageString}</Text>
    </Flex>
  );
};

export default DemoTaskLegendBox;
