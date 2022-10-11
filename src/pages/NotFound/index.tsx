import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface Props {}

const NotFoundPage: React.FC<Props> = () => {
  return (
    <Flex
      align="center"
      justify="center"
      minHeight={[
        "calc(100vh - 64px)",
        "calc(100vh - 64px)",
        "calc(100vh - 64px)",
        "calc(100vh - 70px)",
        "calc(100vh - 86px)",
      ]}
      px="1em"
    >
      <Box>Sorry, this page does exist.</Box>
    </Flex>
  );
};

export default NotFoundPage;
