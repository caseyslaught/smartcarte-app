import React, { useEffect } from "react";
import {
  FormControl,
  FormLabel,
  HStack,
  Select,
  VStack,
  Button,
} from "@chakra-ui/react";
import { FiPlusSquare, FiXSquare } from "react-icons/fi";

import useDemo from "../../hooks/useDemo";
import usePastMonths from "../../hooks/usePastMonths";
import { getLongMonthName } from "../../../../utilities/dates";

interface Props {}

const DemoParametersBox: React.FC<Props> = () => {
  const {
    year,
    setYear,
    month,
    setMonth,
    drawEnabled,
    setDrawEnabled,
    regionGeojson,
    setRegionGeojson,
    setRegionAreaHa,
  } = useDemo();

  const pastMonths = usePastMonths(year);

  useEffect(() => {
    if (!pastMonths.includes(month)) {
      setMonth(pastMonths[pastMonths.length - 1]);
    }
  }, [year, month, setMonth, pastMonths]);

  return (
    <VStack p="1em" w="100%" bg="offWhite" borderRadius="md">
      <FormControl id="taskType">
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
        <FormControl id="year">
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
        <FormControl id="month">
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
      <FormControl id="region">
        <FormLabel>Region</FormLabel>
        <HStack w="100%">
          <Button
            flex={1}
            disabled={regionGeojson !== null}
            colorScheme={drawEnabled ? "green" : "gray"}
            variant={drawEnabled ? "solid" : "outline"}
            rightIcon={<FiPlusSquare />}
            onClick={() => setDrawEnabled(!drawEnabled)}
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
              setRegionAreaHa(null);
            }}
          >
            Clear
          </Button>
        </HStack>
      </FormControl>
    </VStack>
  );
};

export default DemoParametersBox;
