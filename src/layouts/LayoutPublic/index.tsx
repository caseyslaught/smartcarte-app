import React from "react";
import { Box, VStack } from "@chakra-ui/react";

import FooterPublic from "../../components/FooterPublic";
import HeaderPublic from "../../components/HeaderPublic";

interface Props {
  children: JSX.Element;
}

const LayoutPublic: React.FC<Props> = ({ children }) => {
  return (
    <VStack w="100%" overflowX="hidden">
      <HeaderPublic />
      <Box flex={1} w="100%">
        {children}
      </Box>
      <FooterPublic />
    </VStack>
  );
};

export default LayoutPublic;
