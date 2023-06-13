import React from "react";
import { Flex, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";

import ChangeIcon from "../../../../assets/images/feature_change.png";
import MobileIcon from "../../../../assets/images/feature_mobile.png";
import ProcessingIcon from "../../../../assets/images/feature_preprocessing.png";

const text = [
  {
    title: "Cloud Detection",
    text: "Imagery is scanned for clouds and other problematic pixels using neural network models, ensuring that results are ready for analysis.",
    icon: ChangeIcon,
  },
  {
    title: "Cloud Processing",
    text: "We access and process imagery using scalable cloud services, enabling tasks that process dozens of raw images and study areas of up to 5000 km2.",
    icon: ProcessingIcon,
  },
  {
    title: "Simple Web Interface",
    text: "Our interface is built to be intuitive for non-technical users. Results can also be viewed easily on mobile devices to help with field work.",
    icon: MobileIcon,
  },
];

interface SectionProps {}

const FeaturesSection: React.FC<SectionProps> = () => {
  return (
    <Flex
      align="center"
      justify="center"
      color="offWhite"
      w="100%"
      px={6}
      py={[8, 8, 16]}
    >
      <Stack
        spacing={8}
        align={["center", "center", "flex-start"]}
        justify="center"
        direction={["column", "column", "row"]}
        maxW="5xl"
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
      <Heading size="md" maxW="320px">
        {title}
      </Heading>
      <Text>{text}</Text>
    </VStack>
  );
};

export default FeaturesSection;
