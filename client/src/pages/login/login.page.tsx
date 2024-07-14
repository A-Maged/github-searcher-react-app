import { useSearchParams } from "react-router-dom";
import { authApiSlice } from "../../store/auth-api-slice";
import { LoginWithGitHub } from "../../components/shared/login-with-gitHub";
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
    <div className="flex h-screen w-full bg-slate-500 justify-center items-center">
      <LoginWithGitHub />
    </div>
  );
}
