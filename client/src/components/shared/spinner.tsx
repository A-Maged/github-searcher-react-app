import { FaSpinner } from "react-icons/fa";

export function Spinner(props: any = {}) {
  return (
    <div className="flex justify-center items-center w-full h-40" {...props}>
      <FaSpinner fontSize={40} className="animate-spin" />
    </div>
  );
}
