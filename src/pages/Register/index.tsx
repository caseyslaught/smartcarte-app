import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useFormik } from "formik";

import { isEmailValid, isPasswordValid } from "../../utilities/text";
import { AccountFormTypes } from "../../types/formTypes";
import AccountForm from "../../components/AccountForm";
import useAuth from "../../hooks/useAuth";

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { registerError, registerLoading, onRegister, setRegisterError } =
    useAuth();

  const form = useFormik({
    initialValues: {
      organizationName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      setRegisterError("");
      const { firstName, lastName, email, password } = values;
      const newDisabled =
        !isEmailValid(email) ||
        !isPasswordValid(password) ||
        !firstName ||
        !lastName;
      setDisabled(newDisabled);
    },
    onSubmit: async (values) => {
      setRegisterError("");
      // FIXME: more succinct way to do this?
      await onRegister({
        email: values.email,
        password: values.password,
        organizationName: values.organizationName,
        firstName: values.firstName,
        lastName: values.lastName,
      });
    },
  });

  return (
    <Flex
      align={["flex-start", "center"]}
      justify="center"
      minHeight={[
        "calc(100vh - 64px)",
        "calc(100vh - 64px)",
        "calc(100vh - 64px)",
        "calc(100vh - 70px)",
        "calc(100vh - 86px)",
      ]}
      px={["0.5em", "1em"]}
      py={["0.5em", "1em"]}
    >
      <AccountForm
        title="Register"
        error={registerError}
        disabled={disabled}
        loading={registerLoading}
        handleSubmit={() => form.handleSubmit()}
        type={AccountFormTypes.Register}
      >
        <HStack>
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input
              name="firstName"
              placeholder=""
              required={true}
              value={form.values.firstName}
              onChange={form.handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Last name</FormLabel>
            <Input
              name="lastName"
              type="text"
              placeholder=""
              required={true}
              value={form.values.lastName}
              onChange={form.handleChange}
            />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Organization name</FormLabel>
          <Input
            name="organizationName"
            type="text"
            placeholder=""
            required={true}
            value={form.values.organizationName}
            onChange={form.handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder=""
            value={form.values.email}
            onChange={form.handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              name="password"
              placeholder=""
              value={form.values.password}
              onChange={form.handleChange}
              pr="4.5rem"
              type={showPassword ? "text" : "password"}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </AccountForm>
    </Flex>
  );
};

export default RegisterPage;
