import React from "react";
import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";
import {
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTwitterFill,
} from "react-icons/ri";

import LogoLight from "../../assets/images/logo_light.png";

interface Props {}

const FooterPublic: React.FC<Props> = () => {
  return (
    <VStack pb={4} pt={16} spacing={["10px", "40px"]} w="100%" bg="#4f4f52">
      <Stack
        align={["center", "flex-start"]}
        direction={["column", "row"]}
        justify="center"
        spacing={["40px", "60px", "100px"]}
        w="100%"
      >
        <VStack align="flex-start" spacing="1.1em">
          <Image src={LogoLight} w="140px" />
          <Text fontSize="md">hello@smartcarte.earth</Text>
          <HStack spacing="1em">
            <Icon as={RiGithubFill} boxSize="1.6em" />
            <Icon as={RiInstagramFill} boxSize="1.6em" />
            <Icon as={RiLinkedinBoxFill} boxSize="1.6em" />
            <Icon as={RiTwitterFill} boxSize="1.6em" />
          </HStack>
        </VStack>
        <VStack align="flex-start">
          <Text color="gray.300" fontSize="xs">
            APPLICATIONS
          </Text>
          <Link>Burn Area Management</Link>
          <Link>Deforestation Monitoring</Link>
          <Link>Water Quality Monitoring</Link>
        </VStack>
        <VStack align="flex-start">
          <Text color="gray.300" fontSize="xs">
            INFORMATION
          </Text>
          <Link>About Us</Link>
          <Link
            isExternal
            href="https://caseyslaught.notion.site/Smart-Carte-A-Web-Based-Landscape-Intelligence-Platform-2999fdc1b4014455b68b658ce5b1be0f"
          >
            White Paper
          </Link>
        </VStack>
        <VStack></VStack>
      </Stack>

      <VStack color="gray.300">
        <HStack spacing="1em">
          <Link>Cookie Policy</Link>
          <Link>Privacy Policy</Link>
          <Link>Terms of Use</Link>
        </HStack>
        <Box>&copy; Smart Carte Technology, Inc.</Box>
      </VStack>
    </VStack>
  );
};

export default FooterPublic;
