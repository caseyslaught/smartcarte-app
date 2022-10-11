import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Flex, IconButton, Stack, VStack } from "@chakra-ui/react";
import { FaFireAlt, FaSearchLocation, FaTree } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

interface Props {}

const MapPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { token, checkToken } = useAuth();

  useEffect(() => {
    if (!checkToken(token)) navigate("/login", { replace: true });
  }, [token, checkToken, navigate]);

  return (
    <Stack
      direction={["row"]}
      spacing={4}
      h="calc(100vh - 64px)"
      px={["0.8em", "1em"]}
      pb={2}
    >
      <Stack direction="column">
        <IconButton
          w="48px"
          h="48px"
          variant="solid"
          colorScheme="orange"
          aria-label="Deforestaion monitoring"
          fontSize="28px"
          icon={<FaTree />}
        />
        <IconButton
          w="48px"
          h="48px"
          variant="outline"
          colorScheme="orange"
          aria-label="Burn area management"
          fontSize="28px"
          icon={<FaFireAlt />}
        />
        <IconButton
          w="48px"
          h="48px"
          variant="outline"
          colorScheme="orange"
          aria-label="Search land cover"
          fontSize="28px"
          icon={<FaSearchLocation />}
        />
      </Stack>
      <Flex
        flex={1}
        h="100%"
        minW="600px"
        border="1px"
        borderRadius="md"
        borderColor="gray.200"
      >
        Map
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

export default MapPage;
