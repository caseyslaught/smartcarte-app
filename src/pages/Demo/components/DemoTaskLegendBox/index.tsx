import React from "react";
import { Flex, HStack, Square, Text, VStack } from "@chakra-ui/react";

import useDemo from "../../hooks/useDemo";

interface Props {}

const DemoTaskLegendBox: React.FC<Props> = () => {
  const { taskStatistics } = useDemo();

  return (
    <VStack p="1em" w="100%" bg="offWhite" borderRadius="md" spacing={1}>
      {Object.keys(taskStatistics).map((className) => {
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
    case "agriculture":
      color = "#D5A600";
      name = "Agriculture";
      break;
    case "bare_ground":
      color = "#888888";
      name = "Bare ground";
      break;
    case "built":
      color = "#FF0000";
      name = "Built";
      break;
    case "burned":
      color = "#fc9c00";
      name = "Burned";
      break;
    case "semi_natural_vegetation":
      color = "#45d620";
      name = "Natural vegetation";
      break;
    case "trees":
      color = "#1e5e0e";
      name = "Trees";
      break;
    case "water":
      color = "#0566e6";
      name = "Water";
      break;
    default:
      break;
  }

  let percentageString = "";
  if (percentage || percentage === 0) {
    percentageString = `${percentage.toFixed(2)}%`;
  }

  return (
    <Flex justify="space-between" w="100%">
      <HStack align="center" justify="center">
        <Square size="16px" bg={color} />
        <Text>{name}</Text>
      </HStack>
      <Text fontWeight="bold">{percentageString}</Text>
    </Flex>
  );
};

export default DemoTaskLegendBox;
