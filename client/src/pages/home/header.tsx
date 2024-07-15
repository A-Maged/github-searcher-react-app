import { FaGithub } from "react-icons/fa";
import { SearchForm } from "./search-form/search-form";

export function Header() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <FaGithub fontSize={40} />

        <div>
          <h1 className="font-bold">Github Searcher</h1>
          <p className="font-semibold text-gray-500 text-sm">
            Search users or repositories below
          </p>
        </div>
      </div>

      <SearchForm />
    </div>
  );
}
