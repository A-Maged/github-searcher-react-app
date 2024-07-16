import { GitHubUser } from "../../types/github-user";

export function UserCard({ user }: { user: GitHubUser }) {
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
