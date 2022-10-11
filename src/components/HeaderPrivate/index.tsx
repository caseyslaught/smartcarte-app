import React from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";

import LogoLight from "../../assets/images/logo_light.png";
import useAuth from "../../hooks/useAuth";

interface Props {}

const HeaderPrivate: React.FC<Props> = () => {
  const { onLogout } = useAuth();

  return (
    <Flex
      align="center"
      justify="space-between"
      h="64px"
      w="100%"
      px={["0.8em", "1em"]}
      zIndex={9}
    >
      <Box w="160px">
        <Image src={LogoLight} alt="logo" />
      </Box>
      <Button
        colorScheme="whiteAlpha"
        size="sm"
        variant="outline"
        onClick={() => onLogout()}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default HeaderPrivate;
