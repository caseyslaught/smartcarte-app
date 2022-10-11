import React from "react";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { AccountFormTypes } from "../../types/formTypes";

interface Props {
  title: string;
  error?: string | null;
  disabled: boolean;
  loading: boolean;
  handleSubmit: () => void;
  type: AccountFormTypes;
  children: JSX.Element[];
}

const AccountForm: React.FC<Props> = ({
  title,
  error,
  disabled,
  loading,
  type,
  handleSubmit,
  children,
}) => {
  let link = (
    <Link to="/login" replace={true}>
      Login
    </Link>
  );
  if (type === AccountFormTypes.Login) {
    link = (
      <Link to="/register" replace={true}>
        Register
      </Link>
    );
  }

  return (
    <Flex
      direction="column"
      background="white"
      color="gray.700"
      w="400px"
      p={3}
      borderRadius="8px"
      boxShadow="md"
    >
      <Box fontSize="1.2em" mb={4} ms={1}>
        {title}
      </Box>

      <form>
        <VStack mb={3}>{children}</VStack>
      </form>

      <Box color="red.700" textAlign="right" mb={3}>
        {error}
      </Box>

      <Flex align="center" justify="space-between" ms={1} mt={4}>
        <Box color="gray.400">{link}</Box>
        <Button
          type="submit"
          colorScheme="green"
          disabled={disabled || loading}
          isLoading={loading}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default AccountForm;
