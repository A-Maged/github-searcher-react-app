import { FaSpinner } from "react-icons/fa";

export function LoadingFullScreen() {
  return (
    <div className="flex justify-center items-center bg-black w-full h-screen">
      <FaSpinner className="text-4xl text-white animate-spin" />
    </div>
  );
}
