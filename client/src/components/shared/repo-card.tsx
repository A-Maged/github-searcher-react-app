import { GithubRepository } from "../../types/github-repository";

export function RepoCard({ repo }: { repo: GithubRepository }) {
  return (
    <div className="border-gray-400 border rounded-md">
      <div className="flex flex-col gap-3 bg-black p-4 text-white">
        <a href={repo.html_url} target="_blank" className="underline">
          <h1 className="font-bold text-md capitalize">{repo.name}</h1>
        </a>

        <p className="font-semibold text-xs capitalize">
          Author: {repo.owner.login}
        </p>
      </div>

      {/* stats */}
      <div className="flex justify-between p-4 text-center">
        <p className="flex flex-col">
          <span className="font-bold">Stars</span>
          <span>{repo.stargazers_count}</span>
        </p>
        <p className="flex flex-col">
          <span className="font-bold">Issues</span>
          <span>{repo.open_issues_count}</span>
        </p>
        <p className="flex flex-col">
          <span className="font-bold">Forks</span>
          <span>{repo.forks_count}</span>
        </p>
        <p className="flex flex-col">
          <span className="font-bold">Watchers</span>
          <span>{repo.watchers_count}</span>
        </p>
      </div>
    </div>
  );
}
