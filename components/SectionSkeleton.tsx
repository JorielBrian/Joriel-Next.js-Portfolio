type SectionSkeletonProps = {
  variant: "text" | "chips" | "cards";
  count?: number;
};

const SectionSkeleton = ({ variant, count = 3 }: SectionSkeletonProps) => {
  if (variant === "text") {
    return (
      <div className="w-full space-y-3 animate-pulse" aria-label="Loading content" role="status">
        <span className="sr-only">Loading content…</span>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-3 rounded-full bg-blue-100/10" />
            {index < count - 1 && <div className={`h-3 rounded-full bg-blue-100/10 ${index % 2 === 0 ? "w-5/6" : "w-2/3"}`} />}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "chips") {
    return (
      <div className="flex flex-wrap justify-center gap-3 animate-pulse" aria-label="Loading skills" role="status">
        <span className="sr-only">Loading skills…</span>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="h-12 w-12 rounded-2xl border border-white/10 bg-blue-100/10" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-pulse" aria-label="Loading items" role="status">
      <span className="sr-only">Loading items…</span>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="space-y-4 rounded-2xl border border-slate-700/60 bg-slate-900/50 p-5">
          <div className="h-36 rounded-xl bg-slate-700/40" />
          <div className="h-4 w-2/3 rounded-full bg-slate-700/50" />
          <div className="h-3 rounded-full bg-slate-700/40" />
          <div className="h-3 w-4/5 rounded-full bg-slate-700/40" />
        </div>
      ))}
    </div>
  );
};

export default SectionSkeleton;
