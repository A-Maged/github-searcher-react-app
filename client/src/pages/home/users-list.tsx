import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { githubApiSlice } from "../../api/github-api-slice";
import { isValidInput } from "./utils";
import { GitHubUser } from "../../types/github-user";
import { usePage } from "./use-form";
import { Infinite } from "../../components/shared/infinite-scroll";

export function UsersList() {
  const inputVal = useSelector((state: RootState) => state.searchForm.inputVal);

  const selectVal = useSelector(
    (state: RootState) => state.searchForm.selectVal
  );

  const { page, nextPage } = usePage(githubApiSlice, "searchUsers");

  const shouldSkipQuery = !isValidInput(inputVal) || selectVal !== "users";

  const { data, isError, isFetching, error } =
    githubApiSlice.useSearchUsersQuery(
      {
        userName: inputVal,
        page,
      },
      {
        skip: shouldSkipQuery,
      }
    );

  const hasMore =
    data?.total_count! > data?.items.length! && !!data?.items.length!;

  return (
    <Infinite
      error={error}
      isError={isError}
      hasMore={hasMore}
      nextPage={nextPage}
    >
      <div className="grid grid-cols-4">
        {data?.items.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </Infinite>
  );
}

function UserCard({ user }: { user: GitHubUser }) {
  return (
    <div key={user.id}>
      <img
        src={user.avatar_url}
        alt={user.login}
        className="rounded-full w-20 h-20"
      />

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-blue-500"
      >
        {user.login}
      </a>
    </div>
  );
}
