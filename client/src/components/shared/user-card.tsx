import { GitHubUser } from "../../types/github-user";

export function UserCard({ user }: { user: GitHubUser }) {
  return (
    <div
      key={user.id}
      className="flex flex-shrink-0 items-center gap-5 bg-gray-100 rounded-lg capitalize"
    >
      <div className="flex-shrink-0 rounded-lg w-24 h-24 overflow-hidden">
        <img src={user.avatar_url} alt={user.login} className="w-full h-full" />
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="font-semibold underline break-all"
      >
        {user.login}
      </a>
    </div>
  );
}
