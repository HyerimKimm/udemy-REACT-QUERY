import type { Staff } from "@shared/types";

export function filterByTreatment(
  staff: Staff[],
  treatmentName: string
): Staff[] {
  if (treatmentName === "all") return staff;
  return staff.filter((person) =>
    person.treatmentNames
      .map((t) => t.toLowerCase())
      .includes(treatmentName.toLowerCase())
  );
}
