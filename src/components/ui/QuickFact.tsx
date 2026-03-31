export function QuickFact({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-teal-glow/20 bg-teal-glow/5 rounded-lg px-4 py-3">
      <p className="text-xs text-teal-glow font-display uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-white-flash font-bold text-sm">{value}</p>
    </div>
  );
}
