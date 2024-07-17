import { useSearchParams } from "react-router-dom";
import { authApiSlice } from "../../api/auth-api-slice";
import { LoginWithGitHubBtn } from "../../components/shared/login-with-github-btn";
import { LoadingFullScreen } from "../../components/shared/loading-full-screen";

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const githubCode = searchParams.get("code");

  const { isLoading } = authApiSlice.useGetAccessTokenWithCodeQuery(
    githubCode!,
    {
      skip: !githubCode,
    }
  );

  if (isLoading) {
    return <LoadingFullScreen />;
  }

  return (
    <div className="flex justify-center items-center bg-white w-full h-screen">
      <LoginWithGitHubBtn />
    </div>
  );
}
