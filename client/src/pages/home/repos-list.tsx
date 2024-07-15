import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { githubApiSlice } from "../../api/github-api-slice";
import { isValidInput } from "./utils";
import { GithubRepository } from "../../types/github-repository";
import { usePage } from "./use-form";
import { Infinite } from "../../components/shared/infinite-scroll";

export function ReposList() {
  const inputVal = useSelector((state: RootState) => state.searchForm.inputVal);

  const selectVal = useSelector(
    (state: RootState) => state.searchForm.selectVal
  );

  const { page, nextPage } = usePage(githubApiSlice, "searchRepos");

  const shouldSkipQuery = !isValidInput(inputVal) || selectVal !== "repos";

  const { data, isError, error } = githubApiSlice.useSearchReposQuery(
    {
      repoName: inputVal,
      page,
    },
    {
      skip: shouldSkipQuery,
    }
  );

  const hasMore = data?.total_count! > data?.items.length!;

  return (
    <Infinite
      error={error}
      isError={isError}
      hasMore={hasMore}
      nextPage={nextPage}
    >
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data?.items.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </Infinite>
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
