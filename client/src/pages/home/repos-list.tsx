import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { githubApiSlice } from "../../api/github-api-slice";
import { isValidInput } from "./utils";
import { useState } from "react";
import { CustomInfiniteScroll } from "../../components/shared/infinite-scroll";
import { GithubRepository } from "../../types/github-repository";

export function ReposList() {
  const inputVal = useSelector((state: RootState) => state.searchForm.inputVal);
  const selectVal = useSelector(
    (state: RootState) => state.searchForm.selectVal
  );

  const [page, setPage] = useState(1);

  const { data, isError, error } = githubApiSlice.useSearchReposQuery(
    {
      repoName: inputVal,
      page,
    },
    {
      skip: !isValidInput(inputVal) || selectVal !== "repos",
    }
  );

  return (
    <div>
      <CustomInfiniteScroll
        error={error}
        isError={isError}
        hasMore={!!data?.hasMore}
        itemsLength={data?.items.length || 0}
        setPage={setPage}
      >
        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data?.items.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </CustomInfiniteScroll>
    </div>
  );
}

function RepoCard({ repo }: { repo: GithubRepository }) {
  return (
    <div className="border-gray-400 p-4 border rounded-md">
      <h1 className="font-bold text-lg">{repo.name}</h1>
      <p className="overflow-ellipsis">Author: {repo.owner.login}</p>

      {/* stats */}
      <div className="flex gap-2">
        <p>Stars: {repo.stargazers_count}</p>
        <p>Issues: {repo.open_issues_count}</p>
        <p>Forks: {repo.forks_count}</p>
        <p>Watchers: {repo.watchers_count}</p>
      </div>
    </div>
  );
}
