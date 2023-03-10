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

const DemoParametersBox: React.FC<Props> = ({ handleDraw }) => {
  const {
    year,
    setYear,
    month,
    setMonth,
    drawEnabled,
    setDrawEnabled,
    regionGeojson,
    regionArea,
    setRegionArea,
    setRegionGeojson,
    setClearRegionTime,
  } = useDemo();

  const pastMonths = usePastMonths(year);

  let regionSizeString = "0 km² / 5,000 km²";
  let regionTooBig = false;
  if (regionArea) {
    let formattedArea = regionArea.toLocaleString();
    regionTooBig = regionArea > 5000;
    regionSizeString = `${formattedArea} km² / 5,000 km²`;
  }

  useEffect(() => {
    if (!pastMonths.includes(month)) {
      setMonth(pastMonths[pastMonths.length - 1]);
    }
  }, [year, month, setMonth, pastMonths]);

  return (
    <VStack p="1em" w="100%" bg="offWhite" borderRadius="md">
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
            landcover classification
          </option>
        </Select>
      </FormControl>
      <HStack w="100%">
        <FormControl id="year" isRequired={true}>
          <FormLabel>Year</FormLabel>
          <Select
            size="md"
            variant="flushed"
            onChange={(e) => setYear(parseInt(e.target.value))}
            value={year}
          >
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
            <option value={2020}>2020</option>
            <option value={2019}>2019</option>
          </Select>
        </FormControl>
        <FormControl id="month" isRequired={true}>
          <FormLabel>Month</FormLabel>
          <Select
            size="md"
            variant="flushed"
            onChange={(e) => setMonth(parseInt(e.target.value))}
            value={month}
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
            disabled={regionGeojson !== null}
            colorScheme={drawEnabled ? "blue" : "gray"}
            variant={drawEnabled ? "solid" : "outline"}
            rightIcon={<FiPlusSquare />}
            onClick={() => {
              if (!drawEnabled) handleDraw();
              setDrawEnabled(!drawEnabled);
            }}
          >
            Draw
          </Button>
          <Button
            flex={1}
            disabled={regionGeojson === null}
            colorScheme="gray"
            variant="outline"
            rightIcon={<FiXSquare />}
            onClick={() => {
              setRegionGeojson(null);
              setRegionArea(null);
              setClearRegionTime(new Date().getTime());
            }}
          >
            Clear
          </Button>
        </HStack>
        <FormHelperText
          fontWeight={regionArea && regionArea > 0 ? "bold" : "normal"}
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

export default DemoParametersBox;
