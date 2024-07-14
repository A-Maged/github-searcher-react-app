import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login/login.page";

export function GuestApp() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}
