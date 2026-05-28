type MissingWeeksTrendProps = {
  appliedFixes: string[];
};

const FULL_DATA = [54, 55, 57, 60, 62, 63, 69, 75];

export function MissingWeeksTrend({ appliedFixes }: MissingWeeksTrendProps) {
  const fullTimeline = appliedFixes.includes("full-timeline");
  const neutralTitle = appliedFixes.includes("neutral-title");
  const examNote = appliedFixes.includes("exam-note");
  const data = fullTimeline ? FULL_DATA : FULL_DATA.slice(5);
  const labels = fullTimeline ? ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"] : ["W6", "W7", "W8"];
  const min = fullTimeline ? 45 : 60;
  const max = 80;
  const ticks = fullTimeline ? [50, 60, 70, 80] : [60, 70, 80];
  const points = data.map((value, index) => {
    const x = 72 + (index / Math.max(data.length - 1, 1)) * 500;
    const y = 292 - ((value - min) / (max - min)) * 230;
    return { x, y, value, label: labels[index] };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-3xl font-black text-slate-950">
            {neutralTitle ? "Study Stress Survey" : "Stress Is Exploding"}
          </h3>
          <p className="mt-1 text-lg font-semibold text-slate-600">
            {fullTimeline ? "8 weeks shown" : "last 3 weeks shown"}
          </p>
        </div>
        <div className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-black text-rose-800">
          selected window
        </div>
      </div>

      <svg className="mt-4 h-[360px] w-full overflow-visible" viewBox="0 0 640 340" role="img">
        <line x1="64" x2="596" y1="292" y2="292" stroke="#CBD5E1" strokeWidth="2" />
        <line x1="64" x2="64" y1="42" y2="292" stroke="#CBD5E1" strokeWidth="2" />
        {ticks.map((tick) => {
          const y = 292 - ((tick - min) / (max - min)) * 230;
          return (
            <g key={tick}>
              <line x1="58" x2="596" y1={y} y2={y} stroke="#E2E8F0" />
              <text x="48" y={y + 5} textAnchor="end" className="fill-slate-500 text-sm font-bold">
                {tick}
              </text>
            </g>
          );
        })}
        {examNote && (
          <g>
            <rect x={fullTimeline ? 500 : 388} y="48" width="82" height="244" fill="#FEF3C7" opacity="0.75" />
            <text x={fullTimeline ? 541 : 429} y="70" textAnchor="middle" className="fill-amber-800 text-sm font-black">
              exams
            </text>
          </g>
        )}
        <polyline points={line} fill="none" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="8" fill="#2563EB" />
            <text x={point.x} y="320" textAnchor="middle" className="fill-slate-600 text-base font-black">
              {point.label}
            </text>
            <text x={point.x} y={point.y - 14} textAnchor="middle" className="fill-slate-900 text-base font-black">
              {point.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
