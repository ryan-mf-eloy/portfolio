export function RepoSkeleton() {
  return (
    <li className="list-none px-5 py-2">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`flex items-center gap-3 py-2.5 ${
            i > 0 ? "border-t border-oz-border" : ""
          }`}
        >
          <div className="skeleton-shimmer h-3.5 flex-1" />
          <div className="skeleton-shimmer h-3 w-12" />
        </div>
      ))}
    </li>
  );
}
