import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const WaitlistModalForm: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const form = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent color="gray.600" mx=".4em">
        <ModalHeader fontSize="1.4em">Join our waitlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <VStack>
              <HStack spacing={2}>
                <FormControl>
                  <FormLabel htmlFor="firstName">First name</FormLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={form.handleChange}
                    value={form.values.firstName}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="lastName">Last name</FormLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={form.handleChange}
                    value={form.values.lastName}
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={form.handleChange}
                  value={form.values.email}
                />
              </FormControl>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={() => {}}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WaitlistModalForm;
