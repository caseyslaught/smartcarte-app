import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  HStack,
  IconButton,
  VStack,
  Button,
  Spinner,
  Square,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { PublicAPI } from "../../../../api";

import useDemo from "../../hooks/useDemo";
import DemoFormEmailBox from "../DemoFormEmailBox";
import DemoFormParametersBox from "../DemoFormParametersBox";
import DemoTaskStatusBox from "../DemoTaskStatusBox";
import DemoTaskParametersBox from "../DemoTaskParametersBox";
import DemoTaskLegendBox from "../DemoTaskLegendBox";
import DemoTaskDownloadBox from "../DemoTaskDownloadBox";

import { isEmailValid } from "../../../../utilities/text";

interface Props {
  isMobile: boolean;
}

const DemoSidebar: React.FC<Props> = ({ isMobile }) => {
  const navigate = useNavigate();
  const isMobileRef = useRef(isMobile);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const {
    clearFormState,
    formTid,
    formEmail,
    formWaitlistChecked,
    formRegionPolygon,
    formRegionArea,
    formMonth,
    formYear,
    taskUid,
    taskStatus,
    taskRegionPolygon,
    taskFirstLoaded,
  } = useDemo();

  /*** form ***/

  let formRegionTooBig = true;
  if (formRegionPolygon && formRegionArea) {
    formRegionTooBig = formRegionArea > 5000;
  }

  const formStartTaskEnabled =
    !formRegionTooBig && formEmail && isEmailValid(formEmail);

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
          disabled={!formStartTaskEnabled || isFormSubmitting}
          isLoading={isFormSubmitting}
          colorScheme="blue"
          variant="solid"
          w="100%"
          rightIcon={<FiChevronRight />}
          onClick={async () => {
            try {
              setIsFormSubmitting(true);
              const res = await PublicAPI.post(
                "tasks/create_demo_classification_task/",
                {
                  date: formYear + "-" + (formMonth + 1) + "-28",
                  region_geojson: JSON.stringify(formRegionPolygon),
                  email: formEmail,
                  add_to_waitlist: formWaitlistChecked,
                  tid: formTid,
                }
              );

              if (res.status === 201) {
                clearFormState();
                navigate("/demo/" + res.data.task_uid, { replace: true });
              }
            } catch (error) {
              console.log(error);
            } finally {
              setIsFormSubmitting(false);
            }
          }}
        >
          Start task
        </Button>
      </Box>
    </>
  );

  /*** task ***/

  let taskContent = <DemoTaskStatusBox />;
  if (taskStatus === "pending" || taskStatus === "running") {
    taskContent = (
      <>
        <DemoTaskStatusBox />
        <DemoTaskParametersBox />
      </>
    );
  } else if (taskStatus === "complete") {
    taskContent = (
      <>
        <DemoTaskStatusBox />
        <DemoTaskParametersBox />
        <DemoTaskLegendBox />
        {!isMobile && <DemoTaskDownloadBox />}
      </>
    );
  } else if (taskStatus === "failed") {
    taskContent = (
      <>
        <DemoTaskStatusBox />
        <DemoTaskParametersBox />
      </>
    );
  }

  const isTask = taskRegionPolygon !== null; // is task or form

  if (!taskFirstLoaded && taskUid !== null) {
    return (
      <Square
        bg="offWhite"
        borderRadius="md"
        position="fixed"
        top="50px"
        right="10px"
        size="40px"
      >
        <Spinner
          thickness="2px"
          color="blue.500"
          emptyColor="gray.200"
          size="md"
        />
      </Square>
    );
  }

  return (
    <HStack
      spacing={2}
      align="flex-start"
      justify="flex-start"
      position="fixed"
      right={isExpanded ? "10px" : "-280px"}
      top="40px"
      height="calc(100vh - 40px)"
      transition="right 0.3s ease-in-out"
      color="demoDark"
      pointerEvents="none"
    >
      <IconButton
        aria-label="Toggle sidebar visibility"
        pointerEvents="auto"
        background="offWhite"
        color="demoDark"
        onClick={() => {
          if (!isExpanded && scrollRef.current)
            scrollRef.current.scrollTo(0, 0);
          setIsExpanded(!isExpanded);
        }}
        fontSize="xl"
        mt="10px"
        icon={isExpanded ? <FiChevronRight /> : <FiChevronLeft />}
      />

      <VStack
        className="scrollbar"
        ref={scrollRef}
        spacing={2}
        w="280px"
        pointerEvents="auto"
        height="100%"
        overflowY="scroll"
        py="10px"
      >
        {isTask ? taskContent : formContent}
      </VStack>
    </HStack>
  );
};

export default DemoSidebar;
