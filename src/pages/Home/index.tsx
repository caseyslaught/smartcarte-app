import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Globe from "../../assets/images/globe.png";

import LayoutPublic from "../../layouts/LayoutPublic";

import WaitlistModalForm from "./components/WaitlistModalForm";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false);

  return (
    <>
      <WaitlistModalForm
        isModalOpen={isWaitlistOpen}
        setIsModalOpen={setIsWaitlistOpen}
      />
      <LayoutPublic>
        <VStack>
          <Flex
            align="center"
            direction={["column", "row"]}
            height={["auto", "calc(100vh - 86px)"]}
            justify={["center", "space-between"]}
            position="relative"
            width="100%"
          >
            <VStack
              align={["center", "flex-start"]}
              justify={["center", "space-between"]}
              maxWidth={["100%", "550px"]}
              spacing="24px"
              zIndex="9"
            >
              <Heading
                size="3xl"
                bgClip="text"
                bgGradient="linear(to-r, white, blue.100)"
              >
                Understand our rapidly changing world
              </Heading>
              <Text fontSize={["lg", "xl"]}>
                Gain insights into the health of agricultural land, conservation
                areas, and remote ecosystems with near real-time land cover
                classification.
              </Text>
              <Button
                colorScheme="whiteAlpha"
                disabled={isWaitlistOpen}
                variant="outline"
                width={["100%", "auto"]}
                onClick={() => {
                  if (!isWaitlistOpen) setIsWaitlistOpen(true);
                }}
              >
                Join the waitlist
              </Button>
            </VStack>

            <Flex
              position={["static", "absolute"]}
              right={-5}
              zIndex={0}
              w={["600px", "800px"]}
            >
              <Image src={Globe} alt="testing globe" />
            </Flex>
          </Flex>
          <Flex align="center" justify="center" h="0px" w="100%">
            <Box></Box>
          </Flex>
        </VStack>
      </LayoutPublic>
    </>
  );
};

export default HomePage;