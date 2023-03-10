import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react"; // IconButton, HStack
//import { FiInfo, FiChevronLeft } from "react-icons/fi";
//import { Link } from "react-router-dom";

import LogoDemoDark from "../../assets/images/logo_demo_dark.png";

interface Props {}

const HeaderDemo: React.FC<Props> = () => {
  return (
    <Flex
      align="center"
      justify="center"
      h="40px"
      w="100%"
      px={["0.8em", "1em"]}
      zIndex={9}
      background="offWhite"
      position="relative"
    >
      {/* 
 
      <HStack position="absolute" left={0} ms={[0, 0, 4]}>
        <Link to="/" replace={true}>
          <IconButton
            icon={<FiChevronLeft />}
            aria-label="info"
            size="sm"
            color="demoDark"
            colorScheme="gray"
            variant="ghost"
            fontSize="1.2em"
            _hover={{ background: "gray.200" }}
          />
        </Link>
        <IconButton
          icon={<FiInfo />}
          aria-label="info"
          size="sm"
          color="demoDark"
          colorScheme="gray"
          variant="ghost"
          fontSize="1.2em"
          _hover={{ background: "gray.200" }}
        />
      </HStack>
      */}

      <Box h="60%">
        <Image h="100%" src={LogoDemoDark} alt="logo" />
      </Box>
    </Flex>
  );
};

export default HeaderDemo;
