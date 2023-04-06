import React, { useEffect } from "react";
import {
  FormControl,
  FormLabel,
  HStack,
  Select,
  VStack,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { FiPlusSquare, FiXSquare } from "react-icons/fi";

import useDemo from "../../hooks/useDemo";
import usePastMonths from "../../hooks/usePastMonths";
import { getLongMonthName } from "../../../../utilities/dates";

interface Props {
  handleDraw: () => void;
}

const DemoFormParametersBox: React.FC<Props> = ({ handleDraw }) => {
  const {
    formDrawEnabled,
    setFormDrawEnabled,
    formMonth,
    setFormMonth,
    formYear,
    setFormYear,
    formRegionArea,
    setFormRegionArea,
    formRegionPolygon,
    setFormRegionPolygon,
    setFormClearRegionTime,
  } = useDemo();

  const pastMonths = usePastMonths(formYear);

  let regionSizeString = "0 km² / 5,000 km²";
  let regionTooBig = false;
  if (formRegionArea) {
    let formattedArea = formRegionArea.toLocaleString();
    regionTooBig = formRegionArea > 5000;
    regionSizeString = `${formattedArea} km² / 5,000 km²`;
  }

  useEffect(() => {
    if (!pastMonths.includes(formMonth))
      setFormMonth(pastMonths[pastMonths.length - 1]);
  }, [formMonth, setFormMonth, pastMonths]);

  return (
    <VStack
      p="1em"
      w="100%"
      bg="offWhite"
      borderRadius="md"
      pointerEvents="auto"
    >
      <FormControl id="taskType" isRequired={true}>
        <FormLabel>Task type</FormLabel>
        <Select
          disabled={true}
          size="md"
          variant="flushed"
          placeholder="Select task type"
          value="landcover-classification"
        >
          <option value="landcover-classification">
            land cover classification
          </option>
        </Select>
      </FormControl>
      <HStack w="100%">
        <FormControl id="year" isRequired={true}>
          <FormLabel>Year</FormLabel>
          <Select
            size="md"
            variant="flushed"
            onChange={(e) => setFormYear(parseInt(e.target.value))}
            value={formYear}
          >
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
            <option value={2020}>2020</option>
            <option value={2019}>2019</option>
            <option value={2018}>2018</option>
            <option value={2017}>2017</option>
          </Select>
        </FormControl>
        <FormControl id="month" isRequired={true}>
          <FormLabel>Month</FormLabel>
          <Select
            size="md"
            variant="flushed"
            onChange={(e) => setFormMonth(parseInt(e.target.value))}
            value={formMonth}
          >
            {pastMonths.map((month) => (
              <option key={month} value={month}>
                {getLongMonthName(month)}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>
      <FormControl id="region" isRequired={true}>
        <FormLabel>Region of interest</FormLabel>
        <HStack w="100%">
          <Button
            flex={1}
            disabled={formRegionPolygon !== null}
            colorScheme={formDrawEnabled ? "blue" : "gray"}
            variant={formDrawEnabled ? "solid" : "outline"}
            rightIcon={<FiPlusSquare />}
            onClick={() => {
              if (!formDrawEnabled) handleDraw();
              setFormDrawEnabled(!formDrawEnabled);
            }}
          >
            Draw
          </Button>
          <Button
            flex={1}
            disabled={formRegionPolygon === null}
            colorScheme="gray"
            variant="outline"
            rightIcon={<FiXSquare />}
            onClick={() => {
              setFormRegionPolygon(null);
              setFormRegionArea(null);
              setFormClearRegionTime(new Date().getTime());
            }}
          >
            Clear
          </Button>
        </HStack>
        <FormHelperText
          fontWeight={formRegionArea && formRegionArea > 0 ? "bold" : "normal"}
          fontSize="0.8em"
          pe="2px"
          textAlign="right"
          color={regionTooBig ? "red.700" : "inherit"}
        >
          {regionSizeString}
        </FormHelperText>
      </FormControl>
    </VStack>
  );
};

export default DemoFormParametersBox;
