import React from "react";
import HeaderPublic from "../../components/HeaderPublic";
import { Box, VStack } from "@chakra-ui/react";

interface Props {
  children: JSX.Element;
}

const LayoutPublic: React.FC<Props> = ({ children }) => {
  return (
    <VStack px="1em" w="100%">
      <HeaderPublic />
      <Box flex={1} maxW="6xl" w="100%">
        {children}
      </Box>
    </VStack>
  );
};

export default LayoutPublic;
