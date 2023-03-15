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
  const {
    formEmail,
    setFormEmail,
    formWaitlistChecked,
    setFormWaitlistChecked,
  } = useDemo();

  return (
    <VStack
      align="flex-start"
      p="1em"
      w="100%"
      bg="offWhite"
      borderRadius="md"
      pointerEvents="auto"
    >
      <FormControl id="email" isRequired={true}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <Checkbox
          size={["lg", "sm"]}
          ps="2px"
          pt="8px"
          isChecked={formWaitlistChecked}
          onChange={(e) => setFormWaitlistChecked(e.target.checked)}
        >
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
