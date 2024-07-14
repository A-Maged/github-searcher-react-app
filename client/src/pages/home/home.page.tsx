import { FaGithub } from "react-icons/fa";
import { SearchForm } from "./search-form";
import { Nav } from "./nav";

export function HomePage() {
  return (
    <div className="flex flex-col m-auto h-full">
      <Nav />

      <div className="flex flex-col flex-grow justify-center items-center gap-5">
        <div>
          <div className="flex items-center gap-3 -mt-40 mb-4">
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
      </div>
    </div>
  );
}
