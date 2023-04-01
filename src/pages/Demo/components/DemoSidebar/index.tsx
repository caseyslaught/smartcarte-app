import React, { useEffect, useRef } from "react";
import {
  Button,
  HStack,
  IconButton,
  VStack,
  Spinner,
  Square,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import useDemo from "../../hooks/useDemo";
import DemoTaskStatusBox from "../DemoTaskStatusBox";
import DemoTaskParametersBox from "../DemoTaskParametersBox";
// import DemoTaskLegendBox from "../DemoTaskLegendBox";
import DemoTaskDownloadBox from "../DemoTaskDownloadBox";
import DemoFormContent from "../DemoFormContent";

interface Props {
  isMobile: boolean;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

const DemoSidebar: React.FC<Props> = ({
  isMobile,
  isExpanded,
  setIsExpanded,
}) => {
  const navigate = useNavigate();
  const isMobileRef = useRef(isMobile);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const {
    clearTaskState,
    formRegionPolygon,
    taskUid,
    taskStatus,
    taskRegionPolygon,
    taskFirstLoaded,
  } = useDemo();

  /*** form ***/

  const handleDraw = () => {
    if (isMobile) setIsExpanded(false);
  };

  // open sidebar when region is drawn only on mobile
  useEffect(() => {
    // tracks if useEffect is called because of isMobile or regionGeojson change
    const isMobileChange = isMobileRef.current !== isMobile;
    if (isMobile && !isMobileChange && formRegionPolygon) setIsExpanded(true);
    isMobileRef.current = isMobile;
  }, [formRegionPolygon, isMobile, setIsExpanded]);

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
        {/* <DemoTaskLegendBox /> */}
        {!isMobile && <DemoTaskDownloadBox />}

        <Button
          w="100%"
          colorScheme="blue"
          pointerEvents="auto"
          onClick={() => {
            clearTaskState();
            navigate("/demo", { replace: true });
          }}
        >
          New task
        </Button>
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
        borderRadius="4px"
        position="fixed"
        top="50px"
        right="10px"
        size="36px"
        pointerEvents="auto"
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
      zIndex={998}
      spacing={2}
      align="flex-start"
      justify="flex-start"
      position="fixed"
      right={isExpanded ? "10px" : "-280px"}
      top="40px"
      height="calc(100vh - 40px)"
      transition="right 0.3s ease-in-out"
      pointerEvents="none"
      color="demoDark"
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
        borderRadius="4px"
        fontSize="1.4em"
        width={["50px", "50px", "36px"]}
        height={["50px", "50px", "36px"]}
        minWidth="36px"
        mt="10px"
        icon={isExpanded ? <FiChevronRight /> : <FiChevronLeft />}
      />

      <VStack
        className="scrollbar"
        ref={scrollRef}
        spacing={2}
        w="280px"
        height="100%"
        overflowY="scroll"
        pointerEvents={isMobile ? "auto" : "none"}
        py="10px"
      >
        {isTask ? (
          taskContent
        ) : (
          <DemoFormContent isMobile={isMobile} handleDraw={handleDraw} />
        )}
      </VStack>
    </HStack>
  );
};

export default DemoSidebar;
