import { FaSpinner } from "react-icons/fa";

export function LoadingFullScreen() {
  return (
    <div className="flex h-screen w-full bg-slate-900 justify-center items-center">
      <FaSpinner className="animate-spin text-4xl text-white" />
    </div>
  );
}
