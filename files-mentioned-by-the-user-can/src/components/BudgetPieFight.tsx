type BudgetPieFightProps = {
  appliedFixes: string[];
};

const CLUBS = [
  { label: "Dance", value: 18 },
  { label: "Esports", value: 17 },
  { label: "Music", value: 16 },
  { label: "Film", value: 15 },
  { label: "Debate", value: 14 },
  { label: "Art", value: 13 },
  { label: "Other", value: 7 },
];

const COLORS = ["#2563EB", "#F97316", "#14B8A6", "#E11D48", "#8B5CF6", "#84CC16", "#64748B"];

export function BudgetPieFight({ appliedFixes }: BudgetPieFightProps) {
  const sortedBars = appliedFixes.includes("sorted-bars");
  const showValues = appliedFixes.includes("show-values");
  const oneHighlight = appliedFixes.includes("one-highlight");
  const total = CLUBS.reduce((sum, item) => sum + item.value, 0);
  const max = Math.max(...CLUBS.map((item) => item.value));

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-3xl font-black text-slate-950">Club Budget Vote</h3>
          <p className="mt-1 text-lg font-semibold text-slate-600">100 votes, 7 clubs</p>
        </div>
        <div className="rounded-lg bg-amber-100 px-3 py-2 text-sm font-black text-amber-800">
          comparison mode
        </div>
      </div>

      {sortedBars ? (
        <div className="mt-8 grid gap-3">
          {[...CLUBS].sort((a, b) => b.value - a.value).map((item) => {
            const width = `${(item.value / max) * 100}%`;
            const color = oneHighlight && item.value !== max ? "#CBD5E1" : "#2563EB";
            return (
              <div key={item.label} className="grid grid-cols-[96px_1fr_52px] items-center gap-3">
                <div className="text-base font-black text-slate-700">{item.label}</div>
                <div className="h-9 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width, background: color }}
                  />
                </div>
                <div className="text-right text-lg font-black text-slate-900">{showValues ? item.value : ""}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[360px_1fr]">
          <svg viewBox="0 0 300 300" className="mx-auto h-[340px] w-[340px]" role="img">
            {pieSlices(total).map((slice, index) => (
              <path
                key={CLUBS[index].label}
                d={slice}
                fill={oneHighlight && index !== 0 ? "#CBD5E1" : COLORS[index]}
                stroke="#FBFCF8"
                strokeWidth="4"
              />
            ))}
            <circle cx="150" cy="150" r="62" fill="#FBFCF8" />
            <text x="150" y="146" textAnchor="middle" className="fill-slate-950 text-2xl font-black">
              Budget
            </text>
            <text x="150" y="172" textAnchor="middle" className="fill-slate-500 text-sm font-bold">
              vote
            </text>
          </svg>
          <div className="grid grid-cols-2 gap-3">
            {CLUBS.map((item, index) => (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: COLORS[index] }} />
                  <span className="font-black text-slate-700">{item.label}</span>
                </div>
                <div className="mt-1 text-2xl font-black text-slate-950">{showValues ? item.value : "?"}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function pieSlices(total: number) {
  let startAngle = -90;
  return CLUBS.map((item) => {
    const angle = (item.value / total) * 360;
    const path = describeArc(150, 150, 132, startAngle, startAngle + angle);
    startAngle += angle;
    return path;
  });
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(radians),
    y: cy + r * Math.sin(radians),
  };
}
