import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.py4e.com/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  /*
  data: 페이지를 계속 로드할 때 여기에 데이터의 페이지가 포함된다.
  fetchNextPage: 더 많은 데이터가 필요할 때 어느 함수를 실행할지를 InfiniteScroll에 지시하는 역할
  hasNextPage: boolean, 수집할 데이터가 있는지를 결정
   */
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({ pageParam = initialUrl }) => {
      return fetchUrl(pageParam);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  return <InfiniteScroll />;
}
