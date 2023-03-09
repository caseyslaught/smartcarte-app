import React, { useState } from "react";
import { Box, HStack, IconButton, VStack, Button } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import DemoEmailBox from "../DemoEmailBox";
import DemoParametersBox from "../DemoParametersBox";

interface Props {}

const DemoSidebar: React.FC<Props> = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <HStack
      spacing={2}
      align="flex-start"
      justify="flex-start"
      position="absolute"
      right={isExpanded ? "0px" : "-290px"}
      top="0px"
      me="10px"
      mt="10px"
      transition="right 0.3s ease-in-out"
      color="demoDark"
    >
      <IconButton
        aria-label="Toggle sidebar visibility"
        background="offWhite"
        color="demoDark"
        onClick={() => setIsExpanded(!isExpanded)}
        fontSize="xl"
        icon={isExpanded ? <FiChevronRight /> : <FiChevronLeft />}
      />

      <VStack spacing={2} w="280px">
        <DemoParametersBox />
        <DemoEmailBox />

        <Box w="100%" borderRadius="md" display="none">
          <Button
            colorScheme="blue"
            variant="solid"
            w="100%"
            rightIcon={<FiChevronRight />}
          >
            Start task
          </Button>
        </Box>
      </VStack>
    </HStack>
  );
};

export default DemoSidebar;
