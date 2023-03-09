import React from "react";
import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

import useDemo from "../../hooks/useDemo";

interface Props {}

const DemoEmailBox: React.FC<Props> = () => {
  const { email, setEmail } = useDemo();

  return (
    <VStack align="flex-start" p="1em" w="100%" bg="offWhite" borderRadius="md">
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Checkbox defaultChecked size={["lg", "sm"]} ps="2px" pt="8px">
          Join our waitlist
        </Checkbox>
        <FormHelperText fontSize="0.6em">
          You will receive an email when your results are ready.
        </FormHelperText>
      </FormControl>
    </VStack>
  );
};

export default DemoEmailBox;