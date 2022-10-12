import React from "react";
import { Box, Flex, IconButton, Stack, VStack } from "@chakra-ui/react";
import { FaFireAlt, FaSearchLocation, FaTree } from "react-icons/fa";

import { AppOptions } from "../../types/appTypes";
import useApp from "../../hooks/useApp";

import AppMap from "./components/AppMap";

interface Props {}

const AppPage: React.FC<Props> = () => {
  const { currentApp, setCurrentApp } = useApp();

  return (
    <Stack
      direction={["row"]}
      spacing={4}
      h="calc(100vh - 64px)"
      minH="600px"
      px={["0.8em", "1em"]}
      pb={2}
    >
      <Stack direction="column">
        <IconButton
          w="48px"
          h="48px"
          variant={currentApp === AppOptions.Forest ? "solid" : "outline"}
          colorScheme="orange"
          aria-label="Forest monitoring"
          fontSize="28px"
          icon={<FaTree />}
          onClick={() => setCurrentApp(AppOptions.Forest)}
        />
        <IconButton
          w="48px"
          h="48px"
          variant={currentApp === AppOptions.Burn ? "solid" : "outline"}
          colorScheme="orange"
          aria-label="Burn area management"
          fontSize="28px"
          icon={<FaFireAlt />}
          onClick={() => setCurrentApp(AppOptions.Burn)}
        />
        <IconButton
          w="48px"
          h="48px"
          variant={currentApp === AppOptions.Search ? "solid" : "outline"}
          colorScheme="orange"
          aria-label="Search land cover"
          fontSize="28px"
          icon={<FaSearchLocation />}
          onClick={() => setCurrentApp(AppOptions.Search)}
        />
      </Stack>
      <Flex
        flex={1}
        h="100%"
        minW="600px"
        border="1px"
        borderRadius="md"
        borderColor="gray.200"
        overflow="hidden"
      >
        <AppMap />
      </Flex>
      <Stack direction="column" w="260px" minW="260px" h="100%">
        <VStack
          w="100%"
          h="200px"
          border="1px"
          borderRadius="md"
          borderColor="gray.200"
        >
          <Box>Parameters</Box>
        </VStack>
        <VStack
          w="100%"
          h="300px"
          border="1px"
          borderRadius="md"
          borderColor="gray.200"
        >
          <Box>Results</Box>
        </VStack>
      </Stack>
    </Stack>
  );
};

export default AppPage;
