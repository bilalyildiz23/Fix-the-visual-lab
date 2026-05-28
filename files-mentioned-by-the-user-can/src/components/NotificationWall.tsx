type NotificationWallProps = {
  appliedFixes: string[];
};

const CARDS = [
  { label: "Attendance", value: "87.6%", group: "Study", note: "-2.1 pts" },
  { label: "Support tickets", value: "156", group: "Support", note: "+18" },
  { label: "Stress check-ins", value: "41%", group: "Wellbeing", note: "+6 pts" },
  { label: "Late assignments", value: "128", group: "Study", note: "+22" },
  { label: "Room issues", value: "19", group: "Campus", note: "open" },
  { label: "Sleep score", value: "6.1", group: "Wellbeing", note: "/10" },
  { label: "Event signups", value: "612", group: "Campus", note: "+9%" },
  { label: "Peer mentors", value: "27", group: "Support", note: "active" },
];

const GROUPS = ["Study", "Support", "Wellbeing", "Campus"];
const COLORS = ["bg-rose-50", "bg-blue-50", "bg-amber-50", "bg-emerald-50", "bg-fuchsia-50", "bg-cyan-50"];

export function NotificationWall({ appliedFixes }: NotificationWallProps) {
  const pinDecision = appliedFixes.includes("pin-decision") || appliedFixes.includes("attendance-priority");
  const groupCards = appliedFixes.includes("group-cards") || appliedFixes.includes("group-info");
  const quietStyle = appliedFixes.includes("quiet-style") || appliedFixes.includes("reduce-noise");

  return (
    <div className={`h-full rounded-lg border border-slate-200 bg-[#fbfcf8] p-5 ${quietStyle ? "quiet" : ""}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-3xl font-black text-slate-950">Student Support Dashboard</h3>
          <p className="mt-1 text-lg font-semibold text-slate-600">Morning overview</p>
        </div>
        <span className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-black text-white">live board</span>
      </div>

      {pinDecision && (
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-5">
          <div className="text-sm font-black uppercase tracking-wide text-blue-700">Main insight</div>
          <div className="mt-1 text-3xl font-black text-slate-950">Attendance dropped by 2.1 points.</div>
        </div>
      )}

      {groupCards ? (
        <div className="grid gap-3 xl:grid-cols-4">
          {GROUPS.map((group) => (
            <section key={group} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <h4 className="mb-3 text-lg font-black text-slate-800">{group}</h4>
              <div className="grid gap-3">
                {CARDS.filter((card) => card.group === group).map((card, index) => (
                  <DashCard
                    key={card.label}
                    label={card.label}
                    value={card.value}
                    note={card.note}
                    quiet={quietStyle}
                    color={COLORS[index % COLORS.length]}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {CARDS.map((card, index) => (
            <DashCard
              key={card.label}
              label={card.label}
              value={card.value}
              note={card.note}
              quiet={quietStyle}
              color={COLORS[index % COLORS.length]}
            />
          ))}
        </div>
      )}

      <div className={`mt-4 grid gap-3 ${quietStyle ? "lg:grid-cols-2" : "lg:grid-cols-4"}`}>
        <MiniPanel title="Attendance trend" quiet={quietStyle} values={[92, 90, 89, 88, 87.6]} />
        <MiniPanel title="Support pressure" quiet={quietStyle} values={[98, 112, 121, 139, 156]} />
        {!quietStyle && (
          <>
            <MiniPanel title="Event signups" quiet={quietStyle} values={[420, 470, 520, 590, 612]} />
            <MiniPanel title="Room issues" quiet={quietStyle} values={[11, 12, 16, 15, 19]} />
          </>
        )}
      </div>
    </div>
  );
}

function DashCard({
  label,
  value,
  note,
  quiet,
  color,
}: {
  label: string;
  value: string;
  note: string;
  quiet: boolean;
  color: string;
}) {
  return (
    <div className={`rounded-lg border border-slate-200 p-4 transition-all duration-500 ${quiet ? "bg-white" : color}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-black text-slate-500">{label}</div>
        <div className="rounded bg-white/80 px-2 py-1 text-xs font-black text-slate-500">{note}</div>
      </div>
      <div className="mt-2 text-3xl font-black text-slate-950">{value}</div>
    </div>
  );
}

function MiniPanel({ title, values, quiet }: { title: string; values: number[]; quiet: boolean }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values
    .map((value, index) => {
      const x = 18 + index * 42;
      const y = 76 - ((value - min) / Math.max(max - min, 1)) * 48;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={`rounded-lg border border-slate-200 p-4 ${quiet ? "bg-white" : "bg-white/80"}`}>
      <div className="text-sm font-black text-slate-500">{title}</div>
      <svg viewBox="0 0 190 90" className="mt-2 h-20 w-full">
        <polyline points={points} fill="none" stroke={quiet ? "#64748B" : "#2563EB"} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {values.map((value, index) => {
          const x = 18 + index * 42;
          const y = 76 - ((value - min) / Math.max(max - min, 1)) * 48;
          return <circle key={`${value}-${index}`} cx={x} cy={y} r="5" fill={quiet ? "#64748B" : "#2563EB"} />;
        })}
      </svg>
    </div>
  );
}
