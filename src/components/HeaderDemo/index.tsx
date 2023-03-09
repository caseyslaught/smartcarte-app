import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

import LogoDemoDark from "../../assets/images/logo_demo_dark.png";

interface Props {}

const HeaderDemo: React.FC<Props> = () => {
  return (
    <Flex
      align="center"
      justify="center"
      h="48px"
      w="100%"
      px={["0.8em", "1em"]}
      zIndex={9}
      background="offWhite"
    >
      <Box h="70%">
        <Image h="100%" src={LogoDemoDark} alt="logo" />
      </Box>
    </Flex>
  );
};

export default HeaderDemo;
