import React from "react";
import { Box, VStack } from "@chakra-ui/react";

import FooterPublic from "../../components/FooterPublic";
import HeaderPublic from "../../components/HeaderPublic";

interface Props {
  children: JSX.Element;
}

const LayoutPublic: React.FC<Props> = ({ children }) => {
  return (
    <VStack px="1em" w="100%" overflowX="hidden">
      <HeaderPublic />
      <Box flex={1} maxW="8xl" w="100%">
        {children}
      </Box>
      <FooterPublic />
    </VStack>
  );
};

export default LayoutPublic;
