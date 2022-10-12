import React, { useEffect } from "react";
import { Box, Modal, ModalOverlay, VStack } from "@chakra-ui/react";
import { useNavigate, Outlet } from "react-router-dom";

import HeaderApp from "../../components/HeaderApp";
import useAuth from "../../hooks/useAuth";

interface Props {}

const LayoutApp: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { token, checkToken, logoutLoading } = useAuth();

  useEffect(() => {
    const run = async () => {
      const valid = await checkToken();
      if (!valid) navigate("/login", { replace: true });
    };
    run();
  }, [checkToken, navigate]);

  if (!token) return <></>;

  return (
    <VStack w="100%" overflowX="hidden" spacing={0}>
      <Modal isOpen={logoutLoading} onClose={() => {}}>
        <ModalOverlay />
      </Modal>
      <HeaderApp />
      <Box flex={1} w="100%" mt="0em">
        <Outlet />
      </Box>
    </VStack>
  );
};

export default LayoutApp;
