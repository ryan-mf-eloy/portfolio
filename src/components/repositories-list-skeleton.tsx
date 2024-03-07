export default function RepositoriesListSkeleton({
  length,
}: {
  length: number;
}) {
  return Array(length)
    .fill(null)
    .map((_, index) => (
      <li
        key={index}
        role="status"
        className="animate-pulse bg-gradient-to-r bg-zinc-200 dark:bg-zinc-900 hover:from-rose-500 hover:bg-yellow-500 dark:hover:bg-yellow-500 p-[3px] rounded-md transition-[2000ms]"
      >
        <div className="flex flex-col items-start justify-center w-full h-full rounded-sm gap-5 px-4 py-4 bg-zinc-100 dark:bg-zinc-950">
          <div className="h-5 bg-zinc-400 rounded-md dark:bg-zinc-700 w-20"></div>
          <div className="h-3 bg-zinc-400 rounded-sm dark:bg-zinc-700 w-full max-w-80"></div>
          <div className="flex gap-5">
            <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
            <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
            <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
            <div className="h-5 w-5 bg-zinc-400 rounded-sm dark:bg-zinc-700"></div>
          </div>
        </div>
      </li>
    ));
}
