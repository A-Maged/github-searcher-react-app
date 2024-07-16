import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./spinner";

type Props = {
  error: any;
  children: React.ReactNode;
  hasMore: boolean;
  nextPage: () => void;
  isError: boolean;
  isFirstPage: boolean;
  isLoading: boolean;
};

export function InfiniteScroll(props: Props) {
  const {
    hasMore,
    nextPage,
    isLoading,
    isFirstPage,
    children,
    isError,
    error,
  } = props;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      nextPage();
    }
  }, [inView]);

  if (isLoading && isFirstPage) {
    return <Spinner />;
  }

  return (
    <div className="w-full">
      {children}

      {hasMore && !isError && (
        <div ref={ref}>
          <Spinner />
        </div>
      )}

      {isError ? (
        <div className="py-10 text-red-500">
          <h1 className="font-bold text-xl">Error:</h1>

          <p className="text-lg">{(error as any).message}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-3 btn-danger"
          >
            Reload Page
          </button>
        </div>
      ) : null}
    </div>
  );
}
