import { Card } from "./Card";

export function StatCard({ label, value, trend, trendTone = "green", icon }) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-500">{label}</span>
        {icon && <span className="text-teal-500">{icon}</span>}
      </div>
      <span className="text-2xl font-semibold text-ink-900">{value}</span>
      {trend && (
        <span
          className={`text-xs font-medium ${
            trendTone === "amber" ? "text-amber-600" : trendTone === "red" ? "text-rose-600" : "text-emerald-600"
          }`}
        >
          {trend}
        </span>
      )}
    </Card>
  );
}
