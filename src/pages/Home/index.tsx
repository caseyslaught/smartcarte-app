import React from "react";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

import LayoutPublic from "../../layouts/LayoutPublic";

import Globe from "./components/Globe";
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
        <VStack spacing={0}>
          <Flex
            align="center"
            direction={["column", "row"]}
            height={["auto", "calc(100vh - 86px)"]}
            minHeight="680px"
            justify={["center", "space-between"]}
            position="relative"
            px="1em"
            maxW="8xl"
            width="100%"
          >
            <VStack
              align={["center", "flex-start"]}
              justify={["center", "space-between"]}
              maxWidth={["100%", "600px"]}
              spacing="24px"
              zIndex="9"
            >
              <Heading
                size="4xl"
                bgClip="text"
                bgGradient="linear(to-r, white, blue.100)"
              >
                Assess land cover changes in real time
              </Heading>
              <Text fontSize={["lg", "xl"]}>
                Gain insights into the health of protected forests and
                grasslands with intuitive land cover classification and change
                detection tools.
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
              align="center"
              justify="center"
              position={["static", "absolute"]}
              right={0}
              bottom={0}
              zIndex={0}
              height={["auto", "100%"]}
              overflow="visible"
            >
              <Globe />
            </Flex>
          </Flex>
          <Flex
            align="center"
            justify="center"
            h="300px"
            w="100%"
            background="backgroundLight"
          >
            <Box></Box>
          </Flex>
        </VStack>
      </LayoutPublic>
    </>
  );
};

export default HomePage;
