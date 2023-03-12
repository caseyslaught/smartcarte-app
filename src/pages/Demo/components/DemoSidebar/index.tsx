import React, { useEffect, useRef, useState } from "react";
import { Box, HStack, IconButton, VStack, Button } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import useDemo from "../../hooks/useDemo";
import DemoFormEmailBox from "../DemoFormEmailBox";
import DemoFormParametersBox from "../DemoFormParametersBox";
import DemoTaskStatusBox from "../DemoTaskStatusBox";

import { isEmailValid } from "../../../../utilities/text";

interface Props {
  isMobile: boolean;
}

const DemoSidebar: React.FC<Props> = ({ isMobile }) => {
  const isMobileRef = useRef(isMobile);
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const {
    formEmail,
    formRegionPolygon,
    formRegionArea,
    formMonth,
    formYear,
    taskStatus,
  } = useDemo();

  /*** form ***/

  let formRegionTooBig = true;
  if (formRegionPolygon && formRegionArea) {
    formRegionTooBig = formRegionArea > 5000;
  }

  const formStartTaskEnabled =
    formMonth &&
    formYear &&
    !formRegionTooBig &&
    formEmail &&
    isEmailValid(formEmail);

  // open sidebar when region is drawn only on mobile
  useEffect(() => {
    // tracks if useEffect is called because of isMobile or regionGeojson change
    const isMobileChange = isMobileRef.current !== isMobile;
    if (isMobile && !isMobileChange && formRegionPolygon) setIsExpanded(true);
    isMobileRef.current = isMobile;
  }, [formRegionPolygon, isMobile]);

  const handleDraw = () => {
    if (isMobile) setIsExpanded(false);
  };

  const formContent = (
    <>
      <DemoFormParametersBox handleDraw={handleDraw} />
      <DemoFormEmailBox />
      <Box w="100%" borderRadius="md">
        <Button
          disabled={!formStartTaskEnabled}
          colorScheme="blue"
          variant="solid"
          w="100%"
          rightIcon={<FiChevronRight />}
        >
          Start task
        </Button>
      </Box>
    </>
  );

  /*** task ***/

  const isTask = taskStatus !== null;

  const taskContent = (
    <>
      <DemoTaskStatusBox />
    </>
  );

  return (
    <HStack
      spacing={2}
      align="flex-start"
      justify="flex-start"
      position="absolute"
      right={isExpanded ? "0px" : "-290px"}
      top="0px"
      me="10px"
      mt="10px"
      transition="right 0.3s ease-in-out"
      color="demoDark"
      pointerEvents="none"
    >
      <IconButton
        aria-label="Toggle sidebar visibility"
        pointerEvents="auto"
        background="offWhite"
        color="demoDark"
        onClick={() => setIsExpanded(!isExpanded)}
        fontSize="xl"
        icon={isExpanded ? <FiChevronRight /> : <FiChevronLeft />}
      />

      <VStack spacing={2} w="280px" pointerEvents="auto">
        {isTask ? taskContent : formContent}
      </VStack>
    </HStack>
  );
};

export default DemoSidebar;
