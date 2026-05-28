type StoryVisualProps = {
  levelId: string;
  appliedFixes: string[];
};

const budgetData = [
  { label: "Rent", value: 620, color: "#2563EB" },
  { label: "Food", value: 240, color: "#10B981" },
  { label: "Going out", value: 130, color: "#F59E0B" },
  { label: "Transport", value: 90, color: "#8B5CF6" },
  { label: "Savings", value: 80, color: "#14B8A6" },
  { label: "Subscriptions", value: 55, color: "#F43F5E" },
];

const clubData = [
  { label: "Football", members: 120, capacity: 200 },
  { label: "Music", members: 65, capacity: 100 },
  { label: "Art", members: 45, capacity: 50 },
  { label: "Chess", members: 30, capacity: 40 },
];

const cafeteriaData = [
  { label: "Waiting time", value: 48, status: "Priority 1", tone: "rose" },
  { label: "Healthy options", value: 55, status: "Priority 2", tone: "amber" },
  { label: "Price fairness", value: 61, status: "Monitor", tone: "blue" },
  { label: "Food quality", value: 72, status: "Keep strong", tone: "emerald" },
];

const rankingData = [
  { label: "Library", value: 82, uncertainty: 4 },
  { label: "Cafeteria", value: 80, uncertainty: 4 },
  { label: "Sports", value: 79, uncertainty: 5 },
  { label: "Study rooms", value: 78, uncertainty: 4 },
];

export function StoryVisual({ levelId, appliedFixes }: StoryVisualProps) {
  if (levelId === "expert-beginner") {
    return <BudgetAudienceVisual appliedFixes={appliedFixes} />;
  }

  if (levelId === "careful-title") {
    const carefulHeadline = appliedFixes.includes("careful-headline");
    const dramaticTone = appliedFixes.includes("red-warning");
    const hidePoints = appliedFixes.includes("remove-dots");
    return (
      <div className="h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-sm font-black uppercase tracking-wide text-slate-500">
              {carefulHeadline ? "Careful story" : "Draft story"}
            </div>
            <h3 className="mt-1 text-3xl font-black text-slate-950">
              {carefulHeadline ? "More screen time is linked to lower grades" : "Phones are destroying grades"}
            </h3>
            <p className="mt-1 text-lg font-semibold text-slate-600">Screen time per day vs. grade score</p>
          </div>
          <div className={`rounded-lg px-3 py-2 text-sm font-black ${carefulHeadline ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`}>
            {carefulHeadline ? "linked, not caused" : "claim too strong"}
          </div>
        </div>
        <Scatter careful={carefulHeadline} dramatic={dramaticTone} hidePoints={hidePoints} />
        {appliedFixes.includes("cause-note") && (
          <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-lg font-black text-amber-900">
            This shows a relationship, not proof of cause and effect.
          </div>
        )}
      </div>
    );
  }

  if (levelId === "audience-design") {
    return <CafeteriaPriorityVisual appliedFixes={appliedFixes} />;
  }

  if (levelId === "missing-comparison") {
    return <ClubCapacityVisual appliedFixes={appliedFixes} />;
  }

  if (levelId === "honest-ranking") {
    return <HonestRankingVisual appliedFixes={appliedFixes} />;
  }

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-6">
      <h3 className="text-3xl font-black text-slate-950">Visual story</h3>
    </div>
  );
}

function BudgetAudienceVisual({ appliedFixes }: { appliedFixes: string[] }) {
  const hasHeadline = appliedFixes.includes("student-headline");
  const highlightRent = appliedFixes.includes("highlight-rent");
  const clearLabels = appliedFixes.includes("group-labels");
  const repaired = hasHeadline || highlightRent || clearLabels;
  const total = budgetData.reduce((sum, item) => sum + item.value, 0);
  const rentShare = Math.round((620 / total) * 100);
  const palette = repaired
    ? "conic-gradient(#2563EB 0 51%, #10B981 51% 71%, #F59E0B 71% 82%, #8B5CF6 82% 90%, #14B8A6 90% 96%, #F43F5E 96% 100%)"
    : "conic-gradient(#94A3B8 0 51%, #CBD5E1 51% 71%, #A7B4C5 71% 82%, #D6DEE8 82% 90%, #9AA8BA 90% 96%, #C7D2E1 96% 100%)";

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-3xl font-black text-slate-950">Monthly Student Budget</h3>
          <p className="mt-1 text-lg font-semibold text-slate-600">{repaired ? "Student view" : "Finance-style view"}</p>
        </div>
        <div className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-black text-white">Total EUR {total}</div>
      </div>

      {hasHeadline && (
        <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-5">
          <div className="text-sm font-black uppercase tracking-wide text-blue-700">Main takeaway</div>
          <div className="mt-1 text-3xl font-black text-slate-950">Rent takes the biggest part of the budget.</div>
          <div className="mt-2 text-base font-bold text-slate-600">Rent is {rentShare}% of this monthly budget.</div>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="relative mx-auto grid aspect-square w-[260px] place-items-center rounded-full shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)]" style={{ background: palette }}>
            <div className="grid h-[150px] w-[150px] place-items-center rounded-full bg-white text-center shadow-xl">
              <div>
                <div className="text-sm font-black uppercase tracking-wide text-slate-500">{highlightRent ? "Biggest part" : "Largest code"}</div>
                <div className="mt-1 text-4xl font-black text-slate-950">Rent</div>
                <div className="text-2xl font-black text-blue-700">{rentShare}%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-black uppercase tracking-wide text-slate-500">{clearLabels ? "Clear labels" : "Dense category legend"}</div>
            <div className="text-sm font-black text-slate-500">EUR {total}</div>
          </div>
          <div className="grid gap-3">
            {budgetData.map((item) => (
              <div
                key={item.label}
                className={`grid grid-cols-[18px_1fr_86px] items-center gap-3 rounded-lg p-3 ${
                  highlightRent && item.label === "Rent" ? "bg-blue-50" : "bg-slate-50"
                }`}
              >
                <span className="h-4 w-4 rounded-full" style={{ background: highlightRent || clearLabels ? item.color : item.label === "Rent" ? "#94A3B8" : "#CBD5E1" }} />
                <div className="font-black text-slate-800">{item.label}</div>
                <div className="text-right text-lg font-black text-slate-950">{clearLabels || item.label === "Rent" ? `EUR ${item.value}` : "EUR ..."}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-base font-bold text-slate-600">
          {clearLabels ? "Use this view to decide where savings are possible." : "The data is correct, but the main spending story is hidden."}
          </div>
        </div>
      </div>
    </div>
  );
}

function CafeteriaPriorityVisual({ appliedFixes }: { appliedFixes: string[] }) {
  const priorityView = appliedFixes.includes("manager-priority-board");

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-3xl font-black text-slate-950">Cafeteria Feedback</h3>
          <p className="mt-1 text-lg font-semibold text-slate-600">{priorityView ? "Manager priority board" : "Equal feedback cards"}</p>
        </div>
        {appliedFixes.includes("show-sample") && (
          <div className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-black text-white">n = 312</div>
        )}
      </div>

      {priorityView && (
        <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-5 text-3xl font-black text-slate-950">
          Reduce waiting time first.
        </div>
      )}

      {!priorityView ? (
        <div className="mt-5 grid grid-cols-2 gap-4">
          {cafeteriaData.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-lg font-black text-slate-950">{item.label}</div>
              <div className="mt-3 text-4xl font-black text-slate-950">{item.value}%</div>
              <div className="mt-2 text-sm font-black uppercase tracking-wide text-slate-500">Survey score</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-slate-950">Priority matrix</div>
              <div className="text-sm font-bold text-slate-500">Low score + high impact should move first.</div>
            </div>
            <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-black text-slate-600">PowerBI style</div>
          </div>
          <div className="relative h-[360px] overflow-hidden rounded-lg border border-slate-200 bg-[linear-gradient(90deg,#eff6ff_0_50%,#fff7ed_50%_100%)]">
            <div className="absolute left-1/2 top-0 h-full w-px bg-slate-300" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-slate-300" />
            <div className="absolute left-4 top-4 text-xs font-black uppercase tracking-wide text-slate-500">High impact</div>
            <div className="absolute bottom-4 right-4 text-xs font-black uppercase tracking-wide text-slate-500">Needs action</div>
            {cafeteriaData.map((item) => (
              <div
                key={item.label}
                className={`absolute w-[180px] rounded-lg border p-4 shadow-sm ${priorityClass(item.tone)}`}
                style={priorityPosition(item.label)}
              >
                <div className="text-sm font-black uppercase tracking-wide text-slate-500">{item.status}</div>
                <div className="mt-1 text-lg font-black text-slate-950">{item.label}</div>
                <div className="mt-2 text-3xl font-black text-slate-950">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {appliedFixes.includes("show-sample") && <p className="mt-4 text-sm font-bold text-slate-500">Sample info kept visible in small text.</p>}
    </div>
  );
}

function priorityPosition(label: string) {
  if (label === "Waiting time") return { left: "62%", top: "12%" };
  if (label === "Healthy options") return { left: "56%", top: "58%" };
  if (label === "Price fairness") return { left: "18%", top: "58%" };
  return { left: "16%", top: "18%" };
}

function priorityClass(tone: string) {
  if (tone === "rose") return "border-rose-200 bg-rose-50";
  if (tone === "amber") return "border-amber-200 bg-amber-50";
  if (tone === "emerald") return "border-emerald-200 bg-emerald-50";
  return "border-blue-200 bg-blue-50";
}

function ClubCapacityVisual({ appliedFixes }: { appliedFixes: string[] }) {
  const showCapacity = appliedFixes.includes("add-capacity") || appliedFixes.includes("fair-note");
  const sorted = showCapacity ? [...clubData].sort((a, b) => b.members / b.capacity - a.members / a.capacity) : clubData;
  const maxRaw = Math.max(...clubData.map((club) => club.members));

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-3xl font-black text-slate-950">Student Club Popularity</h3>
          <p className="mt-1 text-lg font-semibold text-slate-600">{showCapacity ? "Capacity view" : "Raw member view"}</p>
        </div>
        <div className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-black text-white">
          {showCapacity ? "fairer comparison" : "raw totals"}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {sorted.map((club) => {
          const fill = Math.round((club.members / club.capacity) * 100);
          return (
            <div
              key={club.label}
              className={`rounded-lg border p-4 ${
                showCapacity && club.label === "Art" ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className="grid grid-cols-[110px_1fr_92px] items-center gap-4">
                <div>
                  <div className="text-xl font-black text-slate-950">{club.label}</div>
                  <div className="mt-1 text-sm font-black uppercase tracking-wide text-slate-500">
                    {showCapacity ? `${club.members} / ${club.capacity}` : "members"}
                  </div>
                </div>
                <div className="h-9 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${showCapacity && club.label === "Art" ? "bg-emerald-600" : "bg-blue-600"}`}
                    style={{ width: `${showCapacity ? fill : (club.members / maxRaw) * 100}%` }}
                  />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-950">{showCapacity ? `${fill}%` : club.members}</div>
                  {showCapacity && <div className="text-xs font-bold text-slate-500">full</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {appliedFixes.includes("fair-note") && (
        <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4 text-lg font-black text-slate-950">
          Raw members show size. Capacity shows how full each club is.
        </div>
      )}
    </div>
  );
}

function HonestRankingVisual({ appliedFixes }: { appliedFixes: string[] }) {
  const dotPlot = appliedFixes.includes("uncertainty");
  const removeWinner = appliedFixes.includes("remove-winner");
  const scale = (value: number) => ((value - 70) / 20) * 100;

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-3xl font-black text-slate-950">Student Satisfaction Ranking</h3>
          <p className="mt-1 text-lg font-semibold text-slate-600">{dotPlot ? "Uncertainty range view" : "Ranked KPI cards"}</p>
        </div>
        {!dotPlot && !removeWinner && <div className="rounded-lg bg-amber-100 px-3 py-2 text-sm font-black text-amber-800">clear winner?</div>}
      </div>

      {!dotPlot ? (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {rankingData.map((item, index) => (
            <div
              key={item.label}
              className={`rounded-lg border p-5 ${
                index === 0 && !removeWinner ? "border-amber-300 bg-amber-50 shadow-sm" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-black uppercase tracking-wide text-slate-500">Rank {index + 1}</div>
                {index === 0 && !removeWinner && <div className="rounded-full bg-amber-200 px-3 py-1 text-xs font-black text-amber-900">winner</div>}
              </div>
              <div className="mt-3 text-2xl font-black text-slate-950">{item.label}</div>
              <div className="mt-2 text-5xl font-black text-slate-950">{item.value}%</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-slate-950">Uncertainty range view</div>
              <div className="text-sm font-bold text-slate-500">The ranges overlap, so the exact order is not certain.</div>
            </div>
            <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-black text-slate-600">70-90%</div>
          </div>
          <div className="space-y-6">
            {rankingData.map((item) => {
              const left = scale(item.value - item.uncertainty);
              const width = scale(item.value + item.uncertainty) - left;
              return (
                <div key={item.label} className="grid grid-cols-[120px_1fr_58px] items-center gap-4">
                  <div className="font-black text-slate-800">{item.label}</div>
                  <div className="relative h-12 rounded-lg bg-slate-50">
                    <div className="absolute left-0 top-1/2 h-px w-full bg-slate-200" />
                    <div className="absolute top-[18px] h-3 rounded-full bg-blue-100" style={{ left: `${left}%`, width: `${width}%` }} />
                    <div className="absolute top-3 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-white bg-blue-700 shadow-md" style={{ left: `${scale(item.value)}%` }} />
                    {[70, 75, 80, 85, 90].map((tick) => (
                      <span key={tick} className="absolute top-9 -translate-x-1/2 text-[10px] font-black text-slate-400" style={{ left: `${scale(tick)}%` }}>
                        {tick}
                      </span>
                    ))}
                  </div>
                  <div className="text-right text-xl font-black text-slate-950">{item.value}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {appliedFixes.includes("careful-message") && (
        <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-xl font-black text-slate-950">
          The scores are close. The exact ranking may not be meaningful.
        </div>
      )}
    </div>
  );
}

function Scatter({ careful, dramatic, hidePoints }: { careful: boolean; dramatic: boolean; hidePoints: boolean }) {
  const points = [
    [1.0, 88],
    [1.8, 84],
    [2.5, 81],
    [3.1, 78],
    [3.8, 74],
    [4.6, 70],
    [5.4, 68],
    [6.1, 63],
    [6.8, 60],
    [7.5, 57],
  ];
  const x = (v: number) => 76 + (v / 8) * 500;
  const y = (v: number) => 292 - ((v - 50) / 42) * 238;
  return (
    <svg viewBox="0 0 640 350" className="mt-4 h-[380px] w-full rounded-lg bg-white" role="img">
      <rect x="0" y="0" width="640" height="350" rx="12" fill="#FFFFFF" />
      {[55, 65, 75, 85].map((tick) => (
        <g key={tick}>
          <line x1="64" x2="596" y1={y(tick)} y2={y(tick)} stroke="#E2E8F0" />
          <text x="50" y={y(tick) + 5} textAnchor="end" className="fill-slate-500 text-xs font-bold">
            {tick}
          </text>
        </g>
      ))}
      {[0, 2, 4, 6, 8].map((tick) => (
        <text key={tick} x={x(tick)} y="324" textAnchor="middle" className="fill-slate-500 text-xs font-bold">
          {tick}h
        </text>
      ))}
      <line x1="64" x2="596" y1="292" y2="292" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="64" x2="64" y1="42" y2="292" stroke="#CBD5E1" strokeWidth="2" />
      {points.map(([screen, grade]) => (
        hidePoints ? null : <circle key={`${screen}-${grade}`} cx={x(screen)} cy={y(grade)} r="9" fill="#2563EB" opacity="0.88" />
      ))}
      <line x1={x(0.9)} y1={y(88)} x2={x(7.7)} y2={y(56)} stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" opacity="0.92" />
      <line x1={x(0.9)} y1={y(88)} x2={x(7.7)} y2={y(56)} stroke={dramatic ? "#DC2626" : careful ? "#0F766E" : "#0F172A"} strokeWidth="6" strokeLinecap="round" />
      <text x={x(5.6)} y={y(64) - 12} className="fill-slate-900 text-sm font-black">
        visible relationship
      </text>
      <text x="330" y="344" textAnchor="middle" className="fill-slate-600 text-sm font-black">
        Screen time
      </text>
      <text x="18" y="170" textAnchor="middle" transform="rotate(-90 18 170)" className="fill-slate-600 text-sm font-black">
        Grade
      </text>
    </svg>
  );
}
