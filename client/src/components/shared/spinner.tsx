import { FaSpinner } from "react-icons/fa";

export function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-20">
      <FaSpinner fontSize={40} className="animate-spin" />
    </div>
  );
}
