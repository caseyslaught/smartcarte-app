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
  Select,
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
    <Modal isOpen={isModalOpen} size="lg" onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent color="gray.600" mx=".4em">
        <ModalHeader fontSize="1.4em">Join our waitlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <VStack spacing={3}>
              <HStack spacing={2}>
                <FormControl>
                  <FormLabel htmlFor="firstName">First name</FormLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
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
                    placeholder="Last name"
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
                  placeholder="Email"
                  type="email"
                  onChange={form.handleChange}
                  value={form.values.email}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="industry">Your industry</FormLabel>
                <Select id="industry" placeholder="Select an industry">
                  <option value="pam">Academia</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="pam">Protected Area Management</option>
                  <option value="pam">Water Management</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="feature">Reason for interest</FormLabel>
                <Select id="feature" placeholder="Select an feature">
                  <option value="agriculture">Burn area management</option>
                  <option value="pam">Forest monitoring</option>
                  <option value="pam">Water quality monitoring</option>
                </Select>
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
