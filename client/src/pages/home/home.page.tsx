import { Nav } from "./nav";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Header } from "./header";
import { isValidInput } from "./utils";
import { List } from "./list";

export function HomePage() {
  const inputVal = useSelector((state: RootState) => state.searchForm.inputVal);
  const selectVal = useSelector(
    (state: RootState) => state.searchForm.selectVal
  );

  const shouldShowResults =
    isValidInput(inputVal) && (selectVal === "users" || selectVal === "repos");

  return (
    <div className="flex flex-col m-auto h-full itc">
      <Nav />

      <div
        className={clsx(
          "flex flex-col p-4 md:p-0 container flex-grow m-auto mt-10 gap-10",
          {
            "justify-center items-center -mt-40 ": !shouldShowResults,
          }
        )}
      >
        <Header />

        {shouldShowResults ? (
          <div className="flex flex-grow pb-5 container">
            <List />
          </div>
        ) : null}
      </div>
    </div>
  );
}
