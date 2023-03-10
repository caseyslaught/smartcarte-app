import React from "react";
import { Flex, Modal, ModalOverlay } from "@chakra-ui/react";
import { Outlet, useOutletContext } from "react-router-dom";

import HeaderDemo from "../../components/HeaderDemo";

interface Props {}

type ContextType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LayoutDemo: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <Flex
      id="demo-app-wrapper"
      direction="column"
      h="100%"
      w="100%"
      overflow="hidden"
    >
      <Modal isOpen={isModalOpen} onClose={() => {}}>
        <ModalOverlay />
      </Modal>
      <HeaderDemo />
      <Flex id="demo-content-wrapper" flex={1} w="100%" mt="0em">
        <Outlet context={{ isModalOpen, setIsModalOpen }} />
      </Flex>
    </Flex>
  );
};

export function useModal() {
  return useOutletContext<ContextType>();
}

export default LayoutDemo;
