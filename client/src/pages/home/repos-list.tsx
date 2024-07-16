import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  githubApiSlice,
  SearchReposResponse,
} from "../../api/github-api-slice";
import { isValidInput } from "./utils";
import { GithubRepository } from "../../types/github-repository";
import { InfiniteScroll } from "../../components/shared/infinite-scroll";
import { RESULTS_PER_PAGE } from "../../constants";
import { useEffect } from "react";

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
      page={currentPage}
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

function RepoCard({ repo }: { repo: GithubRepository }) {
  return (
    <div className="border-gray-400 border rounded-md">
      <div className="flex justify-between items-center bg-black p-4 text-white">
        <a href={repo.html_url} target="_blank" className="underline">
          <h1 className="font-bold text-md capitalize">{repo.name}</h1>
        </a>

        <p className="font-semibold text-xs capitalize">
          Author: {repo.owner.login}
        </p>
      </div>

      {/* stats */}
      <div className="flex justify-between p-4 text-center">
        <p className="flex flex-col">
          <span className="font-bold">Stars</span>
          <span>{repo.stargazers_count}</span>
        </p>
        <p className="flex flex-col">
          <span className="font-bold">Issues</span>
          <span>{repo.open_issues_count}</span>
        </p>
        <p className="flex flex-col">
          <span className="font-bold">Forks</span>
          <span>{repo.forks_count}</span>
        </p>
        <p className="flex flex-col">
          <span className="font-bold">Watchers</span>
          <span>{repo.watchers_count}</span>
        </p>
      </div>
    </div>
  );
}
