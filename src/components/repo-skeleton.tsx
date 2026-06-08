export function RepoSkeleton() {
  return (
    <li className="list-none px-5 py-3 sm:px-7">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`flex items-center gap-4 py-3.5 ${
            i > 0 ? "border-t border-oz-border" : ""
          }`}
        >
          <div className="flex flex-1 flex-col gap-2">
            <div className="skeleton-shimmer h-4 w-1/3" />
            <div className="skeleton-shimmer h-3 w-2/3" />
          </div>
          <div className="skeleton-shimmer h-3 w-20" />
        </div>
      ))}
    </li>
  );
}
