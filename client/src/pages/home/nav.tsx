import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../contants";
import { authApiSlice } from "../../api/auth-api-slice";

export function Nav() {
  const { data: user } = authApiSlice.useGetUserQuery();

  function logout() {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    window.location.href = "/";
  }

  return (
    <div className="bg-black p-4 text-white">
      <div className="flex justify-between items-center m-auto container">
        <p>Hi ({user?.name})</p>

        <button className="btn" onClick={logout}>
          logout
        </button>
      </div>
    </div>
  );
}
