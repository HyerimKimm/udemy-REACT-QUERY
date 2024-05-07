import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  const [filter, setFilter] = useState("all");

  const fallback: Staff[] = [];

  const selectFn = useCallback(
    (staff: Staff[]) => {
      if (filter === "all") return staff;
      return filterByTreatment(staff, filter);
    },
    [filter]
  );

  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff, filter],
    queryFn: getStaff,
    select: selectFn,
  });

  return { staff, filter, setFilter };
}
