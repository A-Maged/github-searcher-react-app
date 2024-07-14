import { FaGithub } from "react-icons/fa";

export function LoginWithGitHub() {
  return (
    <a
      className="btn"
      href={`https://github.com/login/oauth/authorize?scope=user&client_id=${
        import.meta.env.VITE_GITHUB_CLIENT_ID
      }`}
    >
      <FaGithub />
      <span>Login with GitHub</span>
    </a>
  );
}
