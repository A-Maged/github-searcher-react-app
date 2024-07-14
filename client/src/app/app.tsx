import { AuthenticatedApp } from "./authenticated-app";
import { GuestApp } from "./guest-app";
import { LoadingFullScreen } from "../components/shared/loading-full-screen";
import { authApiSlice } from "../store/auth-api-slice";

export function App() {
  const { data: user, isLoading } = authApiSlice.useGetUserQuery();

  if (isLoading) {
    return <LoadingFullScreen />;
  }

  if (user) {
    /* if code in query params, remove it */
    const url = new URL(window.location.href);
    url.searchParams.delete("code");
    window.history.replaceState({}, "", url.toString());

    return <AuthenticatedApp />;
  }

  return <GuestApp />;
}
