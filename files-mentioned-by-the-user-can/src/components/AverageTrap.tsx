type AverageTrapProps = {
  appliedFixes: string[];
};

const GROUPS = [
  { label: "Design", value: 92 },
  { label: "Business", value: 77 },
  { label: "Tech", value: 64 },
];

export function AverageTrap({ appliedFixes }: AverageTrapProps) {
  const splitGroups = appliedFixes.includes("split-groups");
  const targetLine = appliedFixes.includes("target-line");
  const nameRisk = appliedFixes.includes("name-risk");
  const target = 80;
  const xFor = (index: number) => 126 + index * 150;
  const yFor = (value: number) => 286 - (value / 100) * 236;

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-3xl font-black text-slate-950">Average Attendance</h3>
          <p className="mt-1 text-lg font-semibold text-slate-600">Student support dashboard</p>
        </div>
        <div className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-black text-white">78% average</div>
      </div>

      {nameRisk && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-5">
          <div className="text-sm font-black uppercase tracking-wide text-amber-700">Needs attention</div>
          <div className="mt-1 text-3xl font-black text-slate-950">Tech students are below the target.</div>
        </div>
      )}

      {splitGroups ? (
        <svg className="mt-4 h-[350px] w-full overflow-visible" viewBox="0 0 640 330" role="img">
          <line x1="84" x2="590" y1="286" y2="286" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="84" x2="84" y1="48" y2="286" stroke="#CBD5E1" strokeWidth="2" />
          {[0, 25, 50, 75, 100].map((tick) => {
            const y = yFor(tick);
            return (
              <g key={tick}>
                <line x1="78" x2="590" y1={y} y2={y} stroke="#E2E8F0" />
                <text x="62" y={y + 5} textAnchor="end" className="fill-slate-500 text-sm font-bold">
                  {tick}
                </text>
              </g>
            );
          })}
          {targetLine && (
            <g>
              <line x1="84" x2="590" y1={yFor(target)} y2={yFor(target)} stroke="#F59E0B" strokeWidth="4" strokeDasharray="8 8" />
              <text x="590" y={yFor(target) - 8} textAnchor="end" className="fill-amber-700 text-sm font-black">
                target 80%
              </text>
            </g>
          )}
          {GROUPS.map((item, index) => {
            const top = yFor(item.value);
            const x = xFor(index);
            const risky = item.value < target;
            return (
              <g key={item.label}>
                <rect
                  x={x}
                  y={top}
                  width="84"
                  height={286 - top}
                  rx="8"
                  fill={risky && nameRisk ? "#F97316" : "#2563EB"}
                  className="transition-all duration-700 ease-out"
                />
                <text x={x + 42} y={top - 10} textAnchor="middle" className="fill-slate-900 text-lg font-black">
                  {item.value}%
                </text>
                <text x={x + 42} y="318" textAnchor="middle" className="fill-slate-600 text-base font-black">
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      ) : (
        <div className="grid min-h-[360px] place-items-center">
          <div className="rounded-lg border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="text-sm font-black uppercase tracking-wide text-slate-500">All students</div>
            <div className="mt-2 text-8xl font-black text-slate-950">78%</div>
            <div className="mt-3 text-xl font-bold text-slate-600">attendance</div>
          </div>
        </div>
      )}
    </div>
  );
}
