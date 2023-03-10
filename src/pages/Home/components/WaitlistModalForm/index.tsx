import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";

import { FiCheckCircle } from "react-icons/fi";

import useLocalStorage from "../../../../hooks/useLocalStorage";
import { isEmailValid } from "../../../../utilities/text";
import { PublicAPI } from "../../../../api";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const WaitlistModalForm: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [complete, setComplete] = useLocalStorage("waitlist_complete", false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      industry: "",
      reason: "",
      message: "",
    },
    validate: (values) => {
      let _disabled = !isEmailValid(values.email);
      _disabled = _disabled || values.industry === "";
      _disabled = _disabled || values.reason === "";
      setDisabled(_disabled);
    },
    onSubmit: async (values, actions) => {
      setLoading(true);
      try {
        const res = await PublicAPI.post("account/waitlist_signup/", {
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
          industry: values.industry,
          reason: values.reason,
          message: values.message,
        });
        if (res.status === 201) {
          setComplete(true);
          actions.resetForm();
          setDisabled(true);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
  });

  if (complete) {
    return (
      <Modal
        isOpen={isModalOpen}
        size="lg"
        onClose={() => setIsModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent color="gray.600" mx={2} my={[2, 16]} py={4}>
          <ModalCloseButton size="lg" />
          <ModalBody>
            <VStack
              px={2}
              spacing={8}
              align="center"
              justify="center"
              w="100%"
              minH="300px"
            >
              <Heading>You're all set!</Heading>
              <Text align="center" maxW={["100%", "100%", "80%"]}>
                Thanks for signing up for our waitlist. We will keep you posted
                about release dates and other developments via email.
              </Text>
              <Icon as={FiCheckCircle} boxSize={20} color="green.600" />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isModalOpen} size="lg" onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent color="gray.600" mx={2} my={[2, 16]}>
        <ModalHeader fontSize="1.4em">Join our waitlist</ModalHeader>
        <ModalCloseButton size="lg" />
        <ModalBody>
          <form>
            <VStack spacing={4}>
              <HStack spacing={2} w="100%">
                <FormControl>
                  <FormLabel htmlFor="firstName">First name</FormLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    type="text"
                    isDisabled={loading}
                    onChange={form.handleChange}
                    value={form.values.firstName}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="lastName">Last name</FormLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    type="text"
                    isDisabled={loading}
                    onChange={form.handleChange}
                    value={form.values.lastName}
                  />
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  isDisabled={loading}
                  onChange={form.handleChange}
                  value={form.values.email}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="industry">Your industry</FormLabel>
                <Select
                  id="industry"
                  isDisabled={loading}
                  placeholder="Select an industry"
                  onChange={form.handleChange}
                >
                  <option value="academia">Academia</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="conservation">Conservation</option>
                  <option value="energy">Energy</option>
                  <option value="development">International Development</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="reason">Reason for interest</FormLabel>
                <Select
                  id="reason"
                  isDisabled={loading}
                  placeholder="Select an feature"
                  onChange={form.handleChange}
                >
                  <option value="burn">Burn area management</option>
                  <option value="forest">Forest monitoring</option>
                  <option value="lulc">Land use / land cover change</option>
                  <option value="water">Water quality monitoring</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Enter a message"
                  isDisabled={loading}
                  onChange={form.handleChange}
                  value={form.values.message}
                  resize="none"
                />
              </FormControl>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            isDisabled={disabled || loading}
            isLoading={loading}
            onClick={() => form.handleSubmit()}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WaitlistModalForm;
