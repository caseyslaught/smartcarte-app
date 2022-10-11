import React, { useState } from "react";
import { Flex, Input } from "@chakra-ui/react";
import { useFormik } from "formik";

import { isEmailValid } from "../../utilities/text";
import { AccountFormTypes } from "../../types/formTypes";
import AccountForm from "../../components/AccountForm";
import useAuth from "../../hooks/useAuth";

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const [disabled, setDisabled] = useState(true);
  const { loginError, setLoginError, onLogin, loginLoading } = useAuth();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      setDisabled(!isEmailValid(values.email) || values.password.length < 7);
    },
    onSubmit: async (values) => {
      setLoginError("");
      await onLogin(values.email, values.password);
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
        title="Login"
        error={loginError}
        disabled={disabled}
        loading={loginLoading}
        handleSubmit={() => form.handleSubmit()}
        type={AccountFormTypes.Login}
      >
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={form.values.email}
          onChange={form.handleChange}
        />
        <Input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          value={form.values.password}
          onChange={form.handleChange}
        />
      </AccountForm>
    </Flex>
  );
};

export default LoginPage;
