import { Nav } from "./nav";
import { UsersList } from "./users-list";
import { RootState } from "../../store/store";
import { ReposList } from "./repos-list";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Header } from "./header";
import { isValidInput } from "./utils";

export function HomePage() {
  const inputVal = useSelector((state: RootState) => state.searchForm.inputVal);
  const selectVal = useSelector(
    (state: RootState) => state.searchForm.selectVal
  );

  const shouldShowResults =
    isValidInput(inputVal) && (selectVal === "users" || selectVal === "repos");

  const list = selectVal === "users" ? <UsersList /> : <ReposList />;

  return (
    <div className="flex flex-col m-auto h-full itc">
      <Nav />

      <div
        className={clsx(
          "flex flex-col p-4 md:p-0 container m-auto mt-10 gap-10",
          {
            "justify-center items-center flex-grow -mt-36": !shouldShowResults,
          }
        )}
      >
        <Header />

        {shouldShowResults ? (
          <div className="m-auto container">{list}</div>
        ) : null}
      </div>
    </div>
  );
}
