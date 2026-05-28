import type { RepairAction } from "../types";

type RepairPanelProps = {
  actions: RepairAction[];
  appliedFixes: string[];
  feedback: string;
  allCorrectApplied: boolean;
  presenterHint: boolean;
  presenterNote: string;
  onApplyAction: (action: RepairAction) => void;
  onTogglePresenterHint: () => void;
  onResetLevel: () => void;
  onShowResult: () => void;
  onNextLevel: () => void;
  isLastLevel: boolean;
  showResult: boolean;
};

export function RepairPanel({
  actions,
  appliedFixes,
  feedback,
  allCorrectApplied,
  presenterHint,
  presenterNote,
  onApplyAction,
  onTogglePresenterHint,
  onResetLevel,
  onShowResult,
  onNextLevel,
  isLastLevel,
  showResult,
}: RepairPanelProps) {
  const correctActions = actions.filter((action) => action.correct);

  return (
    <aside className="lab-card flex h-full flex-col rounded-lg p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-950">Repair choices</h2>
        </div>
        <button
          type="button"
          onClick={onTogglePresenterHint}
          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
            presenterHint
              ? "border-indigo-300 bg-indigo-50 text-indigo-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          Hint
        </button>
      </div>

      {presenterHint && (
        <div className="mb-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
          <div className="font-bold">Presenter hint</div>
          <div className="mt-1">
            Recommended: {correctActions.map((action) => action.label).join(", ")}
          </div>
          <div className="mt-2 font-semibold">{presenterNote}</div>
        </div>
      )}

      <div className="grid gap-3">
        {actions.map((action) => {
          const applied = appliedFixes.includes(action.id);
          const appliedStyle = action.correct
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : "border-amber-200 bg-amber-50 text-amber-900";
          return (
            <button
              key={action.id}
              type="button"
              disabled={applied || showResult}
              onClick={() => onApplyAction(action)}
              className={`group flex min-h-14 items-center justify-between gap-4 rounded-lg border px-4 py-3 text-left text-base font-semibold transition ${
                applied
                  ? appliedStyle
                  : "border-slate-200 bg-white/90 text-slate-800 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm"
              } disabled:cursor-not-allowed disabled:opacity-80`}
            >
              <span>{action.label}</span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm ${
                  applied
                    ? action.correct
                      ? "bg-emerald-500 text-white"
                      : "bg-amber-500 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-blue-100"
                }`}
                aria-hidden="true"
              >
                {applied ? (action.correct ? "Fit" : "!") : "+"}
              </span>
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className="mt-4 min-h-20 rounded-lg border border-slate-200 bg-slate-50 p-4 text-base text-slate-700">
          {feedback}
        </div>
      )}

      <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-2">
        <button
          type="button"
          onClick={onResetLevel}
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-base font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Reset level
        </button>

        {allCorrectApplied && !showResult ? (
          <button
            type="button"
            onClick={onShowResult}
            className="rounded-lg bg-slate-950 px-4 py-3 text-base font-bold text-white transition hover:bg-slate-800"
          >
            Show result
          </button>
        ) : (
          <button
            type="button"
            onClick={onNextLevel}
            disabled={!showResult}
            className="rounded-lg bg-blue-600 px-4 py-3 text-base font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isLastLevel ? "Final screen" : "Next level"}
          </button>
        )}
      </div>
    </aside>
  );
}
