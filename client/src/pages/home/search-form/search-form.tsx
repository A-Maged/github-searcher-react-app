import { useCallback } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { searchFormSliceActions } from "./search-form-slice";

export function SearchForm() {
  const dispatch = useDispatch();
  const inputVal = useSelector((state: RootState) => state.searchForm.inputVal);
  const selectVal = useSelector(
    (state: RootState) => state.searchForm.selectVal
  );

  const debouncedSetInputVal = useCallback(
    debounce((val) => dispatch(searchFormSliceActions.setInputVal(val)), 300),
    [dispatch]
  );

  return (
    <div className="flex gap-5">
      <input
        defaultValue={inputVal}
        onChange={(e) => debouncedSetInputVal(e.target.value)}
        type="text"
        placeholder="Start typing to search .."
        autoComplete="off"
      />

      <select
        value={selectVal}
        onChange={(e) =>
          dispatch(
            searchFormSliceActions.setSelectVal(
              e.target.value as "users" | "repos"
            )
          )
        }
      >
        <option value="users">Users</option>
        <option value="repos">Repos</option>
      </select>
    </div>
  );
}
