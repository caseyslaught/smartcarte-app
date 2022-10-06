import React from "react";
import { Box, Button, HStack, Image, VStack } from "@chakra-ui/react";

import LogoLight from "../../assets/images/logo_light.png";

interface Props {}

const HeaderPublic: React.FC<Props> = () => {
  // TODO: put header heights in theme

  return (
    <VStack justify="center" h={["64px", "86px"]} w="100%" px="1em" zIndex={9}>
      <HStack justify="space-between" margin="0 auto" maxWidth="8xl" w="100%">
        <Box w={["160px", "240px"]}>
          <Image src={LogoLight} alt="logo" />
        </Box>
        <Box>
          <Button
            colorScheme="whiteAlpha"
            size={["sm", "md"]}
            variant="outline"
          >
            Try demo
          </Button>
        </Box>
      </HStack>
    </VStack>
  );
};

export default HeaderPublic;
