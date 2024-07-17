import { FaGithub } from "react-icons/fa";

export function LoginWithGitHubBtn() {
  return (
    <a
      className="btn-dark"
      href={`https://github.com/login/oauth/authorize?scope=user&client_id=${
        import.meta.env.VITE_GITHUB_CLIENT_ID
      }&redirect_uri=${import.meta.env.VITE_GITHUB_REDIRECT_URI}`}
    >
      <FaGithub fontSize={30} />
      <span>Login with GitHub</span>
    </a>
  );
}
