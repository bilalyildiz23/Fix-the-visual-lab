type HypeJumpChartProps = {
  appliedFixes: string[];
};

const DATA = [
  { label: "Q1", value: 76 },
  { label: "Q2", value: 78 },
  { label: "Q3", value: 79 },
  { label: "Q4", value: 80 },
];

export function HypeJumpChart({ appliedFixes }: HypeJumpChartProps) {
  const honestAxis = appliedFixes.includes("axis-zero");
  const positiveColor = appliedFixes.includes("positive-color");
  const neutralCaption = appliedFixes.includes("neutral-caption");
  const yMin = honestAxis ? 0 : 74;
  const yMax = honestAxis ? 100 : 82;
  const chartHeight = 250;
  const baselineY = 286;
  const ticks = honestAxis ? [0, 25, 50, 75, 100] : [74, 76, 78, 80, 82];

  const yForValue = (value: number) => baselineY - ((value - yMin) / (yMax - yMin)) * chartHeight;

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-3xl font-black text-slate-950">Festival Satisfaction</h3>
          <p className="mt-1 text-lg font-semibold text-slate-600">76 to 80</p>
        </div>
        <div className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-black text-white">
          axis starts at {yMin}
        </div>
      </div>

      <svg className="mt-4 h-[360px] w-full overflow-visible" viewBox="0 0 640 340" role="img">
        <line x1="84" x2="600" y1={baselineY} y2={baselineY} stroke="#CBD5E1" strokeWidth="2" />
        <line x1="84" x2="84" y1="28" y2={baselineY} stroke="#CBD5E1" strokeWidth="2" />

        {ticks.map((tick) => {
          const y = yForValue(tick);
          return (
            <g key={tick}>
              <line x1="78" x2="600" y1={y} y2={y} stroke="#E2E8F0" strokeWidth="1" />
              <text x="62" y={y + 5} textAnchor="end" className="fill-slate-500 text-sm font-bold">
                {tick}
              </text>
            </g>
          );
        })}

        {DATA.map((item, index) => {
          const x = 126 + index * 118;
          const top = yForValue(item.value);
          const height = baselineY - top;
          const isBest = item.label === "Q4";
          const fill = isBest ? (positiveColor ? "#10B981" : "#DC2626") : "#2563EB";

          return (
            <g key={item.label}>
              <rect
                x={x}
                y={top}
                width="70"
                height={height}
                rx="8"
                fill={fill}
                className="transition-all duration-700 ease-out"
              />
              <text x={x + 35} y={top - 10} textAnchor="middle" className="fill-slate-900 text-lg font-black">
                {item.value}
              </text>
              <text x={x + 35} y="320" textAnchor="middle" className="fill-slate-600 text-base font-black">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      {neutralCaption && (
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-lg font-black text-slate-700">
          Satisfaction increased from 76 to 80. The improvement is real, but small.
        </div>
      )}
    </div>
  );
}
