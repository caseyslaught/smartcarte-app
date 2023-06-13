import React from "react";
import { Box, Button, Flex, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // useLocation
import { FiArrowRight } from "react-icons/fi";

import LogoLight from "../../assets/images/logo_light.png";

interface Props {}

const HeaderPublic: React.FC<Props> = () => {
  //const { pathname } = useLocation();

  const accountBtn = (
    <Link to="/demo">
      <Button
        colorScheme="telegram"
        size="md"
        variant="solid"
        rightIcon={<FiArrowRight />}
      >
        Get started
      </Button>
    </Link>
  );

  /*
  let accountBtn = (
    <Link to="/login">
      <Button colorScheme="whiteAlpha" size="md" variant="outline">
        Log in
      </Button>
    </Link>
  );
  if (pathname === "/login") {
    accountBtn = (
      <Link to="/register">
        <Button colorScheme="whiteAlpha" size="md" variant="outline">
          Register
        </Button>
      </Link>
    );
  }
  */

  return (
    <Flex
      justify="center"
      h={["64px", "64px", "64px", "70px", "86px"]}
      w="100%"
      px="1em"
      zIndex={9}
    >
      <HStack
        justify="space-between"
        margin="0 auto"
        maxW={["7xl", "7xl", "7xl", "7xl", "7xl", "8xl"]}
        w="100%"
      >
        <Link to="/">
          <Box w={["180px", "180px", "180px", "200px", "240px"]}>
            <Image src={LogoLight} alt="logo" />
          </Box>
        </Link>
        <Box>{accountBtn}</Box>
      </HStack>
    </Flex>
  );
};

export default HeaderPublic;
