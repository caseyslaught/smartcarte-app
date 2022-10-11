import React, { useEffect } from "react";
import { Box, Modal, ModalOverlay, VStack } from "@chakra-ui/react";
import { useNavigate, Outlet } from "react-router-dom";

import HeaderPrivate from "../../components/HeaderPrivate";
import useAuth from "../../hooks/useAuth";

interface Props {}

const LayoutPrivate: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { token, checkToken, logoutLoading } = useAuth();

  useEffect(() => {
    if (!checkToken(token)) navigate("/login", { replace: true });
  }, [token, checkToken, navigate]);

  if (!token) return <></>;

  return (
    <VStack w="100%" overflowX="hidden" spacing={0}>
      <Modal isOpen={logoutLoading} onClose={() => {}}>
        <ModalOverlay />
      </Modal>
      <HeaderPrivate />
      <Box flex={1} w="100%" mt="0em">
        <Outlet />
      </Box>
    </VStack>
  );
};

export default LayoutPrivate;
