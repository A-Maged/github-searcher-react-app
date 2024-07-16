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
import { SearchFormSelectVal } from "./search-form/search-form-slice";
import { UserCard } from "../../components/shared/user-card";

export function List() {
  const inputVal = useSelector((state: RootState) => state.searchForm.inputVal);

  const selectVal = useSelector(
    (state: RootState) => state.searchForm.selectVal
  );

  const shouldSkipQuery = !isValidInput(inputVal);

  const currentPage = useSelector((state: RootState) => {
    const query = state["github-api"].queries[selectVal + inputVal];
    const response = query?.data as SearchReposResponse | SearchReposResponse;
    const dataLength = response?.items.length;

    return Math.ceil(dataLength / RESULTS_PER_PAGE);
  });

  const isFirstPage = useSelector((state: RootState) => {
    const query = state["github-api"].queries[selectVal + inputVal];
    const response = query?.data;
    return !response;
  });

  const isReposSelected = selectVal === SearchFormSelectVal.Repos;

  const searchReposQuery = githubApiSlice.useLazySearchReposQuery();
  const searchUsersQuery = githubApiSlice.useLazySearchUsersQuery();

  const [searchRepos, reposResults] = searchReposQuery;
  const [searchUsers, usersResults] = searchUsersQuery;

  const { data, isFetching, error, isError } = isReposSelected
    ? reposResults
    : usersResults;

  const hasMore = data?.total_count! > data?.items.length!;

  function nextPage() {
    if (shouldSkipQuery) return;

    const page = currentPage ? currentPage + 1 : 1;

    if (isReposSelected) {
      searchRepos({
        repoName: inputVal,
        page,
      });
    } else {
      searchUsers({
        userName: inputVal,
        page,
      });
    }
  }

  const list = isReposSelected ? (
    <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {reposResults.data?.items.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  ) : (
    <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {usersResults.data?.items.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );

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
      {list}
    </InfiniteScroll>
  );
}
