import React from "react";
import {
  Box,
  Flex,
  Image,
  IconButton,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { FiInfo, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

import LogoDemoDark from "../../assets/images/logo_demo_dark.png";

interface Props {
  setIsInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderDemo: React.FC<Props> = ({ setIsInfoModalOpen }) => {
  return (
    <Flex
      align="center"
      justify="center"
      h="40px"
      w="100%"
      px={["0.8em", "1em"]}
      zIndex={999}
      background="offWhite"
      position="fixed"
      top={0}
      shadow="md"
    >
      <HStack position="absolute" left={0} ms={[1, 1, 4]} spacing={2}>
        <Tooltip label="Return home" placement="bottom-end" hasArrow>
          <Link to="/" replace={true}>
            <IconButton
              icon={<FiHome />}
              aria-label="info"
              size="sm"
              color="demoDark"
              isRound={true}
              colorScheme="telegram"
              variant="ghost"
              fontSize="1.1em"
              _hover={{ background: "gray.200" }}
            />
          </Link>
        </Tooltip>
      </HStack>

      <Box h="60%">
        <Image h="100%" src={LogoDemoDark} alt="logo" />
      </Box>

      <HStack position="absolute" right={0} me={[1, 1, 4]} spacing={2}>
        <Tooltip label="Show info" placement="bottom-end" hasArrow>
          <IconButton
            icon={<FiInfo />}
            aria-label="info"
            size="sm"
            color="demoDark"
            isRound={true}
            colorScheme="gray"
            variant="ghost"
            fontSize="1.2em"
            _hover={{ background: "gray.200" }}
            onClick={() => setIsInfoModalOpen(true)}
          />
        </Tooltip>
      </HStack>
    </Flex>
  );
};

export default HeaderDemo;
