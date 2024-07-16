import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  githubApiSlice,
  SearchUsersResponse,
} from "../../api/github-api-slice";
import { isValidInput } from "./utils";
import { GitHubUser } from "../../types/github-user";
import { InfiniteScroll } from "../../components/shared/infinite-scroll";
import { RESULTS_PER_PAGE } from "../../constants";
import { useEffect } from "react";

export function UsersList() {
  const inputVal = useSelector((state: RootState) => state.searchForm.inputVal);

  const selectVal = useSelector(
    (state: RootState) => state.searchForm.selectVal
  );

  const currentPage = useSelector((state: RootState) => {
    const query = state["github-api"].queries[selectVal + inputVal];
    const response = query?.data as SearchUsersResponse;
    const dataLength = response?.items.length;

    return Math.ceil(dataLength / RESULTS_PER_PAGE);
  });

  const [search, { data, isError, error, isFetching }] =
    githubApiSlice.useLazySearchUsersQuery();

  const hasMore = data?.total_count! > data?.items.length!;

  function nextPage() {
    if (!isValidInput(inputVal) || selectVal !== "users") return;

    search({
      userName: inputVal,
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
      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data?.items.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

function UserCard({ user }: { user: GitHubUser }) {
  return (
    <div
      key={user.id}
      className="flex items-center gap-5 bg-gray-100 rounded-lg capitalize overflow-hidden"
    >
      <img src={user.avatar_url} alt={user.login} className="w-24 h-24" />

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="font-semibold underline"
      >
        {user.login}
      </a>
    </div>
  );
}
