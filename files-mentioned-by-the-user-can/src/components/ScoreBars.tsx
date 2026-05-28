import type { Scores, ScoreKey } from "../types";

const SCORE_LABELS: Record<ScoreKey, string> = {
  clarity: "Clarity",
  trust: "Trust",
  audience: "Audience Fit",
  message: "Message Strength",
};

const SCORE_COLORS: Record<ScoreKey, string> = {
  clarity: "bg-sky-500",
  trust: "bg-emerald-500",
  audience: "bg-amber-500",
  message: "bg-violet-500",
};

type ScoreBarsProps = {
  scores: Scores;
};

export function ScoreBars({ scores }: ScoreBarsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {(Object.keys(SCORE_LABELS) as ScoreKey[]).map((key) => (
        <div key={key} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-600">{SCORE_LABELS[key]}</span>
            <span className="text-lg font-bold text-slate-900">{scores[key]}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${SCORE_COLORS[key]} transition-all duration-700 ease-out`}
              style={{ width: `${scores[key]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
