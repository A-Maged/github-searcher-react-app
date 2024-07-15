import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { githubApiSlice } from "../../api/github-api-slice";
import { isValidInput } from "./utils";
import { useState } from "react";
import { CustomInfiniteScroll } from "../../components/shared/infinite-scroll";
import { GitHubUser } from "../../types/github-user";

export function UsersList() {
  const inputVal = useSelector((state: RootState) => state.searchForm.inputVal);

  const selectVal = useSelector(
    (state: RootState) => state.searchForm.selectVal
  );

  const [page, setPage] = useState(1);

  const { data, isError, error } = githubApiSlice.useSearchUsersQuery(
    {
      userName: inputVal,
      page,
    },
    {
      skip: !isValidInput(inputVal) || selectVal !== "users",
    }
  );

  return (
    <div className="">
      <CustomInfiniteScroll
        error={error}
        isError={isError}
        hasMore={!!data?.hasMore}
        itemsLength={data?.items.length || 0}
        setPage={setPage}
      >
        <div className="grid grid-cols-4">
          {data?.items.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </CustomInfiniteScroll>
    </div>
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
