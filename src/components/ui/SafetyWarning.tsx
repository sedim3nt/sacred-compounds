export function SafetyWarning({
  title,
  items,
  note,
}: {
  title: string;
  items: string[];
  note?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="border-2 border-warning-red/40 bg-warning-red/5 rounded-lg p-5 danger-glow">
      <h3 className="font-display text-sm font-bold text-warning-red flex items-center gap-2 mb-3">
        <span className="text-base">&#9888;&#65039;</span> {title}
      </h3>
      {note && (
        <p className="text-xs text-warning-red/70 mb-3 italic">{note}</p>
      )}
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-white-flash/80 flex items-start gap-2">
            <span className="text-warning-red mt-1 shrink-0">&#8226;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
