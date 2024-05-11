import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import type { User } from "@shared/types";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance, getJWTHeader } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { generateUserKey } from "@/react-query/key-factories";

// query function : 서버에서 사용자 데이터를 가져옴
async function getUser(userId: number, userToken: string) {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );

  return data.user;
}

export function useUser() {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { data: user } = useQuery({
    enabled: !!userId, //userId가 유효하지 않으면 이 쿼리가 실행되지 않음
    queryKey: generateUserKey(userId, userToken),
    queryFn: () => getUser(userId, userToken),
    staleTime: Infinity,
  });

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    queryClient.setQueryData(
      generateUserKey(newUser.id, newUser.token), //queryKey
      newUser // 설정할 cache data
    );
  }

  // meant to be called from useAuth
  function clearUser() {
    queryClient.removeQueries({
      queryKey: [queryKeys.user],
      // queryKeys.user 로 쿼리키가 시작되는 모든 쿼리가 제거된다.
      // 해당 쿼리를 사용하는 컴포넌트들은 모두 쿼리 데이터를 잃게 된다.
      //
    });

    queryClient.removeQueries({
      queryKey: [queryKeys.appointments, queryKeys.user],
    });
  }

  return { user, updateUser, clearUser };
}
