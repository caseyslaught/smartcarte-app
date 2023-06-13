import React, { useEffect } from "react";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

import Globe from "./components/Globe";
import FeaturesSection from "./components/FeaturesSection";
import WaitlistModalForm from "./components/WaitlistModalForm";

interface Props {}

const HomePage: React.FC<Props> = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false);

  useEffect(() => {
    document.title = "Smart Carte | Cloud-Free Sentinel-2 Imagery";
  }, []);

  return (
    <VStack spacing={0}>
      <WaitlistModalForm
        isModalOpen={isWaitlistOpen}
        setIsModalOpen={setIsWaitlistOpen}
      />
      <Flex
        align="center"
        direction={["column", "column", "row"]}
        height={[
          "auto",
          "auto",
          "calc(100vh - 64px)",
          "calc(100vh - 70px)",
          "calc(100vh - 86px)",
        ]}
        minHeight={["0px", "0px", "580px", "620px", "680px", "800px"]}
        justify={["center", "center", "space-between"]}
        position="relative"
        px="1em"
        maxW={["7xl", "7xl", "7xl", "7xl", "7xl", "8xl"]}
        width="100%"
      >
        <VStack
          align={["center", "flex-start"]}
          justify={["center", "center", "space-between"]}
          maxWidth={["100%", "100%", "600px"]}
          spacing="24px"
          zIndex={9}
        >
          <Heading
            size="4xl"
            lineHeight="1.1em"
            bgClip="text"
            bgGradient="linear(to-r, white, blue.100)"
            pb="10px"
          >
            Analysis ready satellite imagery
          </Heading>
          <Text fontSize={["lg", "xl"]}>
            Access cloud-free imagery worldwide. We handle tedious and
            computationally-intensive preprocessing steps so you can get started
            with your unique analysis right away.
          </Text>
          <Button
            colorScheme="whiteAlpha"
            disabled={isWaitlistOpen}
            variant="outline"
            width={["100%", "100%", "auto"]}
            onClick={() => {
              if (!isWaitlistOpen) setIsWaitlistOpen(true);
            }}
          >
            Follow our progress
          </Button>
        </VStack>

        <Flex
          align="center"
          justify="center"
          position={["static", "static", "absolute"]}
          right={0}
          zIndex={0}
          //height={["auto", "auto", "100%"]}
          overflow="visible"
        >
          <Globe />
        </Flex>
      </Flex>

      <FeaturesSection />
    </VStack>
  );
};

export default HomePage;
