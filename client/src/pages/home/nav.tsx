import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../constants";
import { authApiSlice } from "../../api/auth-api-slice";

export function Nav() {
  const { data: user } = authApiSlice.useGetUserQuery();

  function logout() {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className="z-10 bg-black p-4 text-white">
      <div className="flex justify-between items-center m-auto container">
        <p>Hi ({user?.login})</p>

        <button className="btn btn-danger" onClick={logout}>
          logout
        </button>
      </div>
    </div>
  );
}
