import React from "react";
import { Flex, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";

import ChangeIcon from "../../../../assets/images/feature_change.png";
import MobileIcon from "../../../../assets/images/feature_mobile.png";
import ProcessingIcon from "../../../../assets/images/feature_preprocessing.png";

const text = [
  {
    title: "Comprehensive Preprocessing",
    text: "Receive high quality, cloud-free satellite imagery for your region of interest. We provide cloud masking, normalization, and mosaicking of 10-meter resolution imagery.",
    icon: ProcessingIcon,
  },
  {
    title: "Timely Change Detection",
    text: "Detect changes to your region of interest in near real-time, allowing you to quickly respond to threats like deforestation and illegal mining.",
    icon: ChangeIcon,
  },
  {
    title: "Seamless Mobile Integration",
    text: "Take important insights into the field with you with mobile-centric mapping tools so you can easily navigate to problem areas identified by our change detection models.",
    icon: MobileIcon,
  },
];

interface SectionProps {}

const FeaturesSection: React.FC<SectionProps> = () => {
  return (
    <Flex
      align="center"
      justify="center"
      bg="backgroundLight"
      color="offWhite"
      w="100%"
      px={4}
      py={[8, 8, 16]}
    >
      <Stack
        spacing={8}
        align={["center", "center", "flex-start"]}
        justify="center"
        direction={["column", "column", "row"]}
        maxW={["7xl", "7xl", "7xl", "7xl", "7xl", "8xl"]}
        width="100%"
      >
        {text.map((item, index) => (
          <FeatureCard
            key={index}
            title={item.title}
            text={item.text}
            icon={item.icon}
          />
        ))}
      </Stack>
    </Flex>
  );
};

interface CardProps {
  title: string;
  text: string;
  icon: string;
}

const FeatureCard: React.FC<CardProps> = ({ title, text, icon }) => {
  return (
    <VStack
      color="offWhite"
      flex={1}
      spacing={3}
      maxW="400px"
      align="flex-start"
    >
      <Image src={icon} w={["40%", "40%", "30%"]} />
      <Heading size="lg" maxW="320px">
        {title}
      </Heading>
      <Text>{text}</Text>
    </VStack>
  );
};

export default FeaturesSection;
