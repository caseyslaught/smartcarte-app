import { useMemo } from "react";

const usePastMonths = (year: number) => {
  return useMemo(() => {
    const now = new Date();
    const pastMonths = [];

    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      if (date < now) {
        pastMonths.push(month);
      }
    }

    return pastMonths;
  }, [year]);
};

export default usePastMonths;
