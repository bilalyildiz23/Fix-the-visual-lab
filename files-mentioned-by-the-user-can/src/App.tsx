import { useState } from "react";
import { HypeJumpChart } from "./components/HypeJumpChart";
import { NotificationWall } from "./components/NotificationWall";
import { RepairPanel } from "./components/RepairPanel";
import { StoryVisual } from "./components/StoryVisual";
import { LEVELS } from "./levels";
import type { ChoiceOption, RepairAction } from "./types";

function App() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [appliedByLevel, setAppliedByLevel] = useState<Record<string, string[]>>({});
  const [actionOrders, setActionOrders] = useState<Record<string, string[]>>(() => ({
    [LEVELS[0].id]: shuffleActions((LEVELS[0].actions ?? []).map((action) => action.id)),
  }));
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const [resultsByLevel, setResultsByLevel] = useState<Record<string, boolean>>({});
  const [presenterHint, setPresenterHint] = useState(false);
  const [finalScreen, setFinalScreen] = useState(false);
  const [attempts, setAttempts] = useState<Record<string, boolean>>({});

  const level = LEVELS[levelIndex];
  const appliedFixes = appliedByLevel[level.id] ?? [];
  const actionOrder = actionOrders[level.id] ?? (level.actions ?? []).map((action) => action.id);
  const showResult = Boolean(resultsByLevel[level.id]);
  const orderedActions = actionOrder
    .map((actionId) => (level.actions ?? []).find((action) => action.id === actionId))
    .filter((action): action is RepairAction => Boolean(action));

  const allCorrectApplied = (level.actions ?? []).filter((action) => action.correct).every((action) => appliedFixes.includes(action.id));
  const allCorrectChoices = [
    ...(level.spot ?? []).map((option) => ({ groupId: "spot", option })),
    ...(level.choices ?? []).flatMap((choiceGroup) => choiceGroup.options.map((option) => ({ groupId: choiceGroup.id, option }))),
  ]
    .filter(({ option }) => option.correct)
    .every(({ groupId, option }) => choices[choiceKey(level.id, groupId)] === option.id);
  const levelComplete = allCorrectApplied && allCorrectChoices;
  const isLastLevel = levelIndex === LEVELS.length - 1;
  const attemptTotals = getAttemptTotals(attempts);

  function applyAction(action: RepairAction) {
    if (appliedFixes.includes(action.id) || showResult) {
      return;
    }
    recordAttempt(`${level.id}:action:${action.id}`, action.correct);
    setAppliedByLevel((current) => {
      const currentLevelFixes = current[level.id] ?? [];
      return { ...current, [level.id]: [...currentLevelFixes, action.id] };
    });
    setFeedback(action.message);
  }

  function chooseOption(groupId: string, option: ChoiceOption) {
    if (showResult || choices[choiceKey(level.id, groupId)] === option.id) {
      return;
    }
    recordAttempt(`${level.id}:choice:${groupId}:${option.id}`, option.correct);
    setChoices((current) => ({ ...current, [choiceKey(level.id, groupId)]: option.id }));
    setFeedback(option.message ?? (option.correct ? "Good choice." : "Try reading the story again."));
  }

  function recordAttempt(attemptId: string, correct: boolean) {
    setAttempts((current) => {
      if (current[attemptId] !== undefined) {
        return current;
      }
      return { ...current, [attemptId]: correct };
    });
  }

  function resetLevel() {
    setAppliedByLevel((current) => ({ ...current, [level.id]: [] }));
    setChoices((current) => {
      const next = { ...current };
      [
        ...(level.spot ? ["spot"] : []),
        ...(level.choices ?? []).map((choiceGroup) => choiceGroup.id),
      ].forEach((groupId) => {
        delete next[choiceKey(level.id, groupId)];
      });
      return next;
    });
    setActionOrders((current) => ({ ...current, [level.id]: shuffleActions((level.actions ?? []).map((action) => action.id)) }));
    setResultsByLevel((current) => ({ ...current, [level.id]: false }));
    setFeedback("");
  }

  function showLevelResult() {
    setResultsByLevel((current) => ({ ...current, [level.id]: true }));
    setFeedback(level.completionFeedback);
  }

  function goNext() {
    if (!showResult) {
      return;
    }
    if (isLastLevel) {
      setFinalScreen(true);
      return;
    }
    const nextIndex = levelIndex + 1;
    const nextLevel = LEVELS[nextIndex];
    setLevelIndex(nextIndex);
    setActionOrders((current) => {
      if (current[nextLevel.id]) {
        return current;
      }
      return { ...current, [nextLevel.id]: shuffleActions((nextLevel.actions ?? []).map((action) => action.id)) };
    });
    setFeedback("");
  }

  if (finalScreen) {
    const finalTotals = getAttemptTotals(attempts);

    return (
      <main className="min-h-screen px-5 py-6 text-slate-900 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center">
          <section className="lab-card w-full rounded-lg p-8 text-center md:p-12">
            <div className="mx-auto inline-grid min-h-16 place-items-center rounded-lg bg-emerald-100 px-5 text-2xl font-black text-emerald-700">
              Good choice
            </div>
            <h1 className="mt-6 text-5xl font-black text-slate-950">Final result: You repaired the visual stories.</h1>
            <p className="mx-auto mt-4 max-w-2xl text-2xl text-slate-600">
              Small design choices can change what people believe.
            </p>
            <div className="mx-auto mt-8 grid max-w-3xl gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <div className="text-sm font-black uppercase tracking-wide text-emerald-700">Helpful choices</div>
                <div className="mt-1 text-4xl font-black text-emerald-700">{finalTotals.good}</div>
              </div>
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
                <div className="text-sm font-black uppercase tracking-wide text-rose-700">Less useful choices</div>
                <div className="mt-1 text-4xl font-black text-rose-700">{finalTotals.wrong}</div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-sm font-black uppercase tracking-wide text-slate-500">Fit score</div>
                <div className="mt-1 text-4xl font-black text-slate-950">{finalTotals.accuracy}%</div>
              </div>
            </div>
            <div className="mx-auto mt-5 grid max-w-4xl gap-3 text-left md:grid-cols-2">
              {LEVELS.map((reportLevel) => (
                <div key={reportLevel.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-sm font-black uppercase tracking-wide text-slate-500">{reportLevel.title}</div>
                  <div className="mt-2 grid gap-1 text-base font-black text-slate-950">
                    {selectedLabels(reportLevel.id, choices).length
                      ? selectedLabels(reportLevel.id, choices).map((label) => <div key={label}>{label}</div>)
                      : "No choices selected"}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setFinalScreen(false);
                setLevelIndex(0);
                setAppliedByLevel({});
                setActionOrders({ [LEVELS[0].id]: shuffleActions((LEVELS[0].actions ?? []).map((action) => action.id)) });
                setChoices({});
                setAttempts({});
                setResultsByLevel({});
                setFeedback("");
              }}
              className="mt-8 rounded-lg bg-blue-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
            >
              Play again
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-5 text-slate-900 lg:px-8">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5">
        <header className="lab-card overflow-hidden rounded-lg">
          <div className="h-2 bg-gradient-to-r from-cyan-500 via-emerald-500 to-amber-400" />
          <div className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-base font-bold uppercase tracking-wide text-blue-700">Level {levelIndex + 1} of {LEVELS.length}</p>
                <h1 className="mt-1 text-4xl font-black text-slate-950 lg:text-5xl">Fix the Visual Lab</h1>
                <p className="mt-2 text-xl text-slate-600">Repair the story, not only the chart.</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-right">
                <div className="text-sm font-bold uppercase tracking-wide text-slate-500">{level.category}</div>
                <div className="mt-1 text-2xl font-black text-slate-950">{level.title}</div>
                <div className="mt-1 text-base text-slate-600">{level.theme}</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-base font-black text-slate-700">
                Helpful <span className="ml-2 text-2xl text-emerald-700">{attemptTotals.good}</span>
              </div>
              <div className="rounded-lg border border-rose-200 bg-white px-4 py-3 text-base font-black text-slate-700">
                Less useful <span className="ml-2 text-2xl text-rose-700">{attemptTotals.wrong}</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-base font-black text-slate-700">
                Fit score <span className="ml-2 text-2xl text-slate-950">{attemptTotals.accuracy}%</span>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="lab-card rounded-lg p-4">
            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-slate-900 px-4 py-3 text-white">
              <span className="rounded bg-white/10 px-3 py-1 text-sm font-black uppercase tracking-wide text-cyan-100">
                Main question
              </span>
              <span className="text-xl font-black">{level.prompt}</span>
            </div>
            <div className="mb-4 rounded-lg border border-slate-200 bg-white/85 p-4 text-lg font-bold leading-relaxed text-slate-700">
              {level.context}
            </div>
            <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-lg font-bold leading-relaxed text-slate-800">
              <span className="mr-2 text-sm font-black uppercase tracking-wide text-blue-700">Goal</span>
              {level.goal}
            </div>
            <div className="min-h-[500px]">
              {level.id === "dramatic-improvement" && <HypeJumpChart appliedFixes={appliedFixes} />}
              {level.id === "busy-dashboard" && (
                <NotificationWall appliedFixes={appliedFixes} />
              )}
              {level.id === "expert-beginner" && <StoryVisual levelId={level.id} appliedFixes={appliedFixes} />}
              {level.id === "careful-title" && <StoryVisual levelId={level.id} appliedFixes={appliedFixes} />}
              {level.id === "missing-comparison" && <StoryVisual levelId={level.id} appliedFixes={appliedFixes} />}
              {level.id === "audience-design" && <StoryVisual levelId={level.id} appliedFixes={appliedFixes} />}
              {level.id === "honest-ranking" && <StoryVisual levelId={level.id} appliedFixes={appliedFixes} />}
            </div>
          </div>

          <div className="grid gap-4">
            {level.spot && (
              <ChoicePanel
                title="Spot it"
                groupId="spot"
                levelId={level.id}
                options={level.spot}
                selectedId={choices[choiceKey(level.id, "spot")]}
                onChoose={chooseOption}
                disabled={showResult}
              />
            )}
            {level.choices?.map((choiceGroup) => (
              <ChoicePanel
                key={choiceGroup.id}
                title={choiceGroup.title}
                groupId={choiceGroup.id}
                levelId={level.id}
                options={choiceGroup.options}
                selectedId={choices[choiceKey(level.id, choiceGroup.id)]}
                onChoose={chooseOption}
                disabled={showResult}
              />
            ))}
            {orderedActions.length > 0 && (
              <RepairPanel
                actions={orderedActions}
                appliedFixes={appliedFixes}
                feedback={feedback}
                allCorrectApplied={levelComplete}
                presenterHint={presenterHint}
                presenterNote={level.presenterNote}
                onApplyAction={applyAction}
                onTogglePresenterHint={() => setPresenterHint((current) => !current)}
                onResetLevel={resetLevel}
                onShowResult={showLevelResult}
                onNextLevel={goNext}
                isLastLevel={isLastLevel}
                showResult={showResult}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function ChoicePanel({
  title,
  groupId,
  options,
  selectedId,
  onChoose,
  disabled = false,
}: {
  title: string;
  groupId: string;
  levelId: string;
  options: ChoiceOption[];
  selectedId?: string;
  onChoose: (groupId: string, option: ChoiceOption) => void;
  disabled?: boolean;
}) {
  return (
    <section className="lab-card rounded-lg p-5">
      <div className="mb-3 text-3xl font-black text-slate-950">{title}</div>
      <div className="grid gap-3">
        {options.map((option) => {
          const selected = selectedId === option.id;
          const selectedStyle = option.correct
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : "border-amber-200 bg-amber-50 text-amber-900";
          return (
            <button
              key={option.id}
              type="button"
              disabled={disabled}
              onClick={() => onChoose(groupId, option)}
              className={`rounded-lg border px-4 py-3 text-left text-base font-black transition ${
                selected
                  ? selectedStyle
                  : "border-slate-200 bg-white/90 text-slate-800 hover:border-blue-300 hover:bg-blue-50"
              } disabled:cursor-not-allowed disabled:opacity-80`}
            >
              <span>{option.label}</span>
              {selected && (
                <span className="mt-2 block text-sm uppercase tracking-wide">
                  {option.correct ? "Helpful" : "Less useful"}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function selectedLabels(levelId: string, choices: Record<string, string>) {
  const level = LEVELS.find((item) => item.id === levelId);
  if (!level) return [];
  const options = [
    ...(level.spot ?? []).map((option) => ({ groupId: "spot", option })),
    ...(level.choices ?? []).flatMap((choiceGroup) => choiceGroup.options.map((option) => ({ groupId: choiceGroup.id, option }))),
  ];
  return options
    .filter(({ groupId, option }) => choices[choiceKey(levelId, groupId)] === option.id)
    .map(({ option }) => option.label);
}

function getAttemptTotals(attempts: Record<string, boolean>) {
  const values = Object.values(attempts);
  const good = values.filter(Boolean).length;
  const wrong = values.length - good;
  return {
    good,
    wrong,
    accuracy: values.length ? Math.round((good / values.length) * 100) : 0,
  };
}

function shuffleActions(actionIds: string[]) {
  return [...actionIds].sort(() => Math.random() - 0.5);
}

function choiceKey(levelId: string, groupId: string) {
  return `${levelId}:${groupId}`;
}

export default App;
