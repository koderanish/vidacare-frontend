import { HeartPulse } from "lucide-react";

export function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-vida-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.45)]">
        <HeartPulse className="h-5 w-5" />
      </span>
      <span className={`text-lg font-bold tracking-tight ${light ? "text-white" : "text-vida-deep"}`}>
        Vida<span className="text-vida-400">Care</span>
      </span>
    </span>
  );
}
