import React, { useEffect } from "react";
import { Box, Button, Flex, Select } from "@chakra-ui/react";

import useAuth from "../../hooks/useAuth";
import useApp from "../../hooks/useApp";

interface Props {}

const HeaderApp: React.FC<Props> = () => {
  const { onLogout } = useAuth();
  const { currentApp } = useApp();

  const regions = [
    "Central Sector",
    "Lake Sector",
    "Northern Sector",
    "Southern Sector",
  ];

  return (
    <Flex
      align="center"
      justify="space-between"
      h="64px"
      w="100%"
      px={["0.8em", "1em"]}
      zIndex={9}
    >
      <Box>
        <Select size={["sm", "md"]} variant="outline">
          {regions.map((region) => (
            <option value={region} key={region} style={{ color: "#333" }}>
              {region}
            </option>
          ))}
        </Select>
      </Box>
      <Button
        colorScheme="whiteAlpha"
        size="sm"
        variant="outline"
        onClick={() => onLogout()}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default HeaderApp;
