import type { Appointment } from "@shared/types";

import { axiosInstance, getJWTHeader } from "../../../axiosInstance";

import { useLoginData } from "@/auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { generateUserAppointmentKey } from "@/react-query/key-factories";

// for when we need a query function for useQuery
async function getUserAppointments(
  userId: number,
  userToken: string
): Promise<Appointment[] | null> {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
}

export function useUserAppointments(): Appointment[] {
  const fallback: Appointment[] = [];

  const { userId, userToken } = useLoginData();

  // TODO replace with React Query
  const { data = fallback } = useQuery({
    enabled: !!userId,
    queryKey: generateUserAppointmentKey(userId, userToken),
    queryFn: () => getUserAppointments(userId, userToken),
  });

  return data;
}
