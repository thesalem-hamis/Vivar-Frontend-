// Shimmer animation is handled with Tailwind's animate-pulse

function GridSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded-lg w-4/5" />
        <div className="h-3 bg-gray-100 rounded-lg w-2/5" />
        <div className="flex gap-3 mt-1">
          <div className="h-3 bg-gray-100 rounded-full w-12" />
          <div className="h-3 bg-gray-100 rounded-full w-12" />
          <div className="h-3 bg-gray-100 rounded-full w-16" />
        </div>
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
          <div className="h-5 bg-gray-200 rounded-lg w-24" />
          <div className="h-8 bg-gray-200 rounded-xl w-16" />
        </div>
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex animate-pulse">
      <div className="w-52 sm:w-72 h-48 bg-gray-200 shrink-0" />
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
          <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
          <div className="h-3 bg-gray-100 rounded-lg w-5/6" />
          <div className="h-3 bg-gray-100 rounded-lg w-3/5" />
          <div className="flex gap-3 mt-2">
            <div className="h-3 bg-gray-100 rounded-full w-16" />
            <div className="h-3 bg-gray-100 rounded-full w-16" />
            <div className="h-3 bg-gray-100 rounded-full w-20" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="h-6 bg-gray-200 rounded-lg w-28" />
          <div className="h-10 bg-gray-200 rounded-xl w-32" />
        </div>
      </div>
    </div>
  );
}

interface PropertySkeletonProps {
  count?: number;
  layout?: "grid" | "list";
}

export function PropertySkeleton({
  count = 6,
  layout = "grid",
}: PropertySkeletonProps) {
  const items = Array.from({ length: count });

  if (layout === "list") {
    return (
      <div className="flex flex-col gap-4">
        {items.map((_, i) => (
          <ListSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((_, i) => (
        <GridSkeleton key={i} />
      ))}
    </div>
  );
}
