import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";

export function usePage(apiSlice: any, queryName: string) {
  const cachedPage = useSelector(
    (state: RootState) =>
      apiSlice.util.selectCachedArgsForQuery(state, queryName)?.[0]?.page + 1
  );

  const [p, setP] = useState<number>(() => cachedPage || 1);

  function nextPage() {
    setP((prev) => prev + 1);
  }

  return { page: p, nextPage };
}
