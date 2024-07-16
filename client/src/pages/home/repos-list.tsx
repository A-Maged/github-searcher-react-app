import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  githubApiSlice,
  SearchReposResponse,
} from "../../api/github-api-slice";
import { isValidInput } from "./utils";
import { InfiniteScroll } from "../../components/shared/infinite-scroll";
import { RESULTS_PER_PAGE } from "../../constants";
import { useEffect } from "react";
import { RepoCard } from "../../components/shared/repo-card";

export function ReposList() {
  const inputVal = useSelector((state: RootState) => state.searchForm.inputVal);

  const selectVal = useSelector(
    (state: RootState) => state.searchForm.selectVal
  );

  const shouldSkipQuery = !isValidInput(inputVal) || selectVal !== "repos";

  const currentPage = useSelector((state: RootState) => {
    const query = state["github-api"].queries[selectVal + inputVal];
    const response = query?.data as SearchReposResponse;
    const dataLength = response?.items.length;

    return Math.ceil(dataLength / RESULTS_PER_PAGE);
  });

  const isFirstPage = useSelector((state: RootState) => {
    const query = state["github-api"].queries[selectVal + inputVal];
    const response = query?.data;
    return !response;
  });

  const [search, { data, isError, error, isFetching }] =
    githubApiSlice.useLazySearchReposQuery();

  const hasMore = data?.total_count! > data?.items.length!;

  function nextPage() {
    if (shouldSkipQuery) return;

    search({
      repoName: inputVal,
      page: currentPage ? currentPage + 1 : 1,
    });
  }

  useEffect(() => {
    nextPage();
  }, [inputVal, selectVal]);

  return (
    <InfiniteScroll
      dataLength={data?.items.length}
      isFirstPage={isFirstPage}
      isLoading={isFetching}
      error={error}
      isError={isError}
      hasMore={hasMore}
      nextPage={nextPage}
    >
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.items.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
