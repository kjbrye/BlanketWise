export function LoadingSkeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-[rgba(139,69,19,0.1)] rounded-lg ${className}`} />
  );
}

export function HorseCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[rgba(139,69,19,0.1)]">
      <div className="flex items-start gap-4">
        <LoadingSkeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <LoadingSkeleton className="h-6 w-32 mb-2" />
          <LoadingSkeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function BlanketCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[rgba(139,69,19,0.1)]">
      <div className="flex items-start gap-4">
        <LoadingSkeleton className="w-16 h-16 rounded-xl" />
        <div className="flex-1">
          <LoadingSkeleton className="h-6 w-40 mb-2" />
          <LoadingSkeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Weather bar skeleton */}
      <LoadingSkeleton className="h-24 w-full rounded-xl" />

      {/* Main grid */}
      <div className="grid grid-cols-[1fr_280px] gap-6">
        <div className="space-y-6">
          {/* Recommendation card skeleton */}
          <LoadingSkeleton className="h-48 w-full rounded-xl" />
          {/* Schedule skeleton */}
          <LoadingSkeleton className="h-32 w-full rounded-xl" />
          {/* Forecast skeleton */}
          <LoadingSkeleton className="h-24 w-full rounded-xl" />
        </div>
        <div className="space-y-6">
          <LoadingSkeleton className="h-32 w-full rounded-xl" />
          <LoadingSkeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <LoadingSkeleton className="h-64 w-full rounded-2xl" />
      <LoadingSkeleton className="h-48 w-full rounded-2xl" />
      <LoadingSkeleton className="h-32 w-full rounded-2xl" />
    </div>
  );
}
