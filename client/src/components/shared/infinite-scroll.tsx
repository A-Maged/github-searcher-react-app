import { FaSpinner, FaThumbsUp } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  error: any;
  children: React.ReactNode;
  hasMore: boolean;
  itemsLength: number;
  isError: boolean;
  setPage: (fn: (prev: number) => number) => void;
};

export function CustomInfiniteScroll(props: Props) {
  const { setPage, error, isError, itemsLength, hasMore, children } = props;

  const loadMore = () => {
    setPage((p) => p + 1);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={itemsLength || 0}
        next={loadMore}
        hasMore={hasMore}
        loader={
          isError ? null : (
            <div className="flex justify-center items-center w-full h-40">
              <FaSpinner fontSize={40} className="animate-spin" />
            </div>
          )
        }
        endMessage={
          <div className="flex justify-center items-center gap-5 h-60 text-3xl">
            <p>That's all.</p>
            <FaThumbsUp />
          </div>
        }
      >
        {children}
      </InfiniteScroll>

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
