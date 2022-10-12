import React, { useEffect } from "react";
import { Box, Modal, ModalOverlay, VStack } from "@chakra-ui/react";
import { useNavigate, Outlet } from "react-router-dom";

import FooterPublic from "../../components/FooterPublic";
import HeaderPublic from "../../components/HeaderPublic";
import useAuth from "../../hooks/useAuth";

interface Props {}

const LayoutPublic: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { token, checkToken, loginLoading, registerLoading } = useAuth();

  useEffect(() => {
    const run = async () => {
      const valid = await checkToken();
      if (valid) navigate("/app", { replace: true });
    };
    run();
  }, [checkToken, navigate]);

  if (token) return <></>;

  return (
    <VStack w="100%" overflowX="hidden" spacing={0}>
      <Modal isOpen={loginLoading || registerLoading} onClose={() => {}}>
        <ModalOverlay />
      </Modal>

      <HeaderPublic />
      <Box flex={1} w="100%">
        <Outlet />
      </Box>
      <FooterPublic />
    </VStack>
  );
};

export default LayoutPublic;
