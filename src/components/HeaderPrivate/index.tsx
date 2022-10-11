import React from "react";
import { Box, Button, Flex, Select } from "@chakra-ui/react";

import useAuth from "../../hooks/useAuth";

interface Props {}

const HeaderPrivate: React.FC<Props> = () => {
  const { onLogout } = useAuth();

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

export default HeaderPrivate;
