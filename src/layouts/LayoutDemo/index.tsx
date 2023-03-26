import React, { useEffect } from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  Tbody,
  Tr,
  Td,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Outlet, useOutletContext } from "react-router-dom";

import HeaderDemo from "../../components/HeaderDemo";
import useLocalStorage from "../../hooks/useLocalStorage";

interface Props {}

type ContextType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LayoutDemo: React.FC<Props> = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = React.useState(false);
  const [firstVisit, setFirstVisit] = useLocalStorage("firstVisit", true);

  useEffect(() => {
    console.log("firstVisit", firstVisit);

    if (firstVisit) {
      setIsInfoModalOpen(true);
      setFirstVisit(false);
    }
  }, [firstVisit, setFirstVisit]);

  return (
    <Flex
      id="demo-app-wrapper"
      direction="column"
      h="100%"
      w="100%"
      overflowX="hidden"
      overflowY="hidden"
    >
      <Modal
        isOpen={isInfoModalOpen}
        onClose={() => {
          setIsInfoModalOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent mx="1em" color="demoDark">
          <ModalHeader pb={2}>Getting started</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="100%" spacing={4}>
              <Text>
                Welcome to our demo that enables you to seamlessly explore,
                download, and examine satellite imagery and land cover data from
                any location across the globe. Dive straight into your analysis
                with accurate, high-quality imagery at your fingertips.
              </Text>

              <Table variant="simple" size="sm">
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold" w="80px">
                      Step 1
                    </Td>
                    <Td>Select a year and month</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold" w="80px">
                      Step 2
                    </Td>
                    <Td>
                      Click <i>Draw</i> and select a region on the map
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold" w="80px">
                      Step 3
                    </Td>
                    <Td>
                      Enter your email so we can notify you when the results are
                      ready
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold" w="80px">
                      Step 4
                    </Td>
                    <Td>
                      Click <i>Start task</i>
                    </Td>
                  </Tr>
                </Tbody>
                <TableCaption>
                  This a demo so please bare with us if you encounter any issues
                  🙃
                </TableCaption>
              </Table>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <HeaderDemo setIsInfoModalOpen={setIsInfoModalOpen} />
      <Flex id="demo-content-wrapper" flex={1} w="100%" mt="0em">
        <Outlet context={{ isInfoModalOpen, setIsInfoModalOpen }} />
      </Flex>
    </Flex>
  );
};

export function useModal() {
  return useOutletContext<ContextType>();
}

export default LayoutDemo;
