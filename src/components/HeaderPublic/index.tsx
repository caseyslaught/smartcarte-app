import React from "react";
import { Box, Button, HStack, Image, VStack } from "@chakra-ui/react";

import LogoLight from "../../assets/images/logo_light.png";

interface Props {}

const HeaderPublic: React.FC<Props> = () => {
  return (
    <VStack justify="center" h={["64px", "92px"]} w="100%">
      <HStack justify="space-between" margin="0 auto" maxWidth="6xl" w="100%">
        <Box w={["160px", "240px"]}>
          <Image src={LogoLight} alt="logo" />
        </Box>
        <Box>
          <Button colorScheme="blue" size={["sm", "md"]} variant="outline">
            Try demo
          </Button>
        </Box>
      </HStack>
    </VStack>
  );
};

export default HeaderPublic;
