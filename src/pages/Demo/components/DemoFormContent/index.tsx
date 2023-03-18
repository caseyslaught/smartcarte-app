import React, { useState } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";

import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import useDemo from "../../hooks/useDemo";
import { isEmailValid } from "../../../../utilities/text";
import { PublicAPI } from "../../../../api";
import DemoFormParametersBox from "../DemoFormParametersBox";
import DemoFormEmailBox from "../DemoFormEmailBox";

interface Props {
  isMobile: boolean;
  handleDraw: () => void;
}

const DemoFormContent: React.FC<Props> = ({ isMobile, handleDraw }) => {
  const toast = useToast();
  const navigate = useNavigate();
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
  } = useDemo();

  let formRegionTooBig = true;
  if (formRegionPolygon && formRegionArea) {
    formRegionTooBig = formRegionArea > 5000;
  }

  const formStartTaskEnabled =
    !formRegionTooBig && formEmail && isEmailValid(formEmail);

  const handleSubmit = async () => {
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
    } catch (error: any) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        toast({
          title: "Cannot connect to server",
          description:
            "There is a network connection problem. This could be caused by an Internet connection problem or a server error. Please try again later.",
          status: "warning",
          duration: 12000,
          isClosable: true,
        });
      } else if (error.code === "ERR_BAD_REQUEST") {
        const errorCode = error?.response?.data?.error;
        if (errorCode === "task_limit") {
          toast({
            title: "Too many running tasks",
            description:
              "You can only have one running task at a time. Please wait for your current task to finish before starting a new one.",
            status: "warning",
            duration: 12000,
            isClosable: true,
          });
        } else if (errorCode === "fargate_error") {
          toast({
            title: "Server capacity reached",
            description:
              "We have reached our server capacity. Please try again later.",
            status: "warning",
            duration: 12000,
            isClosable: true,
          });
        }
      }
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <>
      <DemoFormParametersBox handleDraw={handleDraw} />
      <DemoFormEmailBox />
      <Box w="100%" borderRadius="md" pointerEvents="auto">
        <Button
          disabled={!formStartTaskEnabled || isFormSubmitting}
          isLoading={isFormSubmitting}
          colorScheme="blue"
          variant="solid"
          w="100%"
          rightIcon={<FiChevronRight />}
          onClick={handleSubmit}
        >
          Start task
        </Button>
      </Box>
    </>
  );
};

export default DemoFormContent;
